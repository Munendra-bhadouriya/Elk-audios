import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const consultationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  company: z.string().optional(),
  preferredDateTime: z.string().optional(),
  needs: z.string().optional(),
  message: z.string().optional(),

  // ✅ Payment fields
  paymentId: z.string().optional(),
  orderId: z.string().optional(),
  amount: z.number().optional(),
  currency: z.string().optional(),
  paymentMethod: z.string().optional(),
  receipt: z.string().optional(),
  signature: z.string().optional(),
  status: z.string().optional(),
});

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendResendEmail(params: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.apiKey}`,
    },
    body: JSON.stringify({
      from: params.from,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(
      body?.error?.message || `Email failed (${res.status})`
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);
    const parsed = consultationSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      company,
      preferredDateTime,
      needs,
      message,
      paymentId,
      orderId,
      amount,
      currency,
      paymentMethod,
      receipt,
      signature,
      status,
    } = parsed.data;

    const sheetId = process.env.GOOGLE_SHEET_ID!;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL!;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const now = new Date();
    const istTime = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "short",
      timeStyle: "medium",
    }).format(now);

    const row = [
      istTime,
      fullName,
      email,
      phone,
      company?.trim() || "",
      preferredDateTime?.trim() || "",
      needs?.trim() || "",
      message?.trim() || "",
      paymentId || "",
      orderId || "",
      amount || "",
      currency || "",
      paymentMethod || "",
      receipt || "",
      signature || "",
      status || "PENDING",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Razorpay!A:P",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    // ================= EMAIL =================

    const adminEmail = process.env.ADMIN_EMAIL;
    const apiKey = process.env.EMAIL_API_KEY;

    // Skip emails in test/local setups where mail envs are not configured.
    if (adminEmail && apiKey) {
      // ADMIN EMAIL
      await sendResendEmail({
        apiKey,
        from: adminEmail,
        to: adminEmail,
        subject: "New Consultation Request",
        text: `
New Consultation Request

Name: ${fullName}
Email: ${email}
Phone: ${phone}
Company: ${company || "-"}
Preferred Date: ${preferredDateTime || "-"}
Needs: ${needs || "-"}
Message: ${message || "-"}

Status: ${status || "PENDING"}
PaymentId: ${paymentId || "-"}
OrderId: ${orderId || "-"}
Amount: ${amount || "-"}
Currency: ${currency || "-"}
Payment Method: ${paymentMethod || "-"}
Receipt: ${receipt || "-"}
Signature: ${signature || "-"}
      `,
      });

      // USER EMAIL
      await sendResendEmail({
        apiKey,
        from: adminEmail,
        to: email,
        subject: "We received your request",
        text: `
Hi ${fullName},

Thanks for contacting ELK Audios.
We’ve received your consultation request.

Our team will get back to you shortly.

Best regards,
ELK Audios
      `,
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}