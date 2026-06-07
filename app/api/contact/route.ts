import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    const nameRaw = (body as any)?.name;
    const emailRaw = (body as any)?.email;
    const phoneRaw = (body as any)?.phone;
    const messageRaw = (body as any)?.message;

    // Required-field validation: if any are missing, respond with the exact required message.
    if (
      !isNonEmptyString(nameRaw) ||
      !isNonEmptyString(emailRaw) ||
      !isNonEmptyString(phoneRaw) ||
      !isNonEmptyString(messageRaw)
    ) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const name = nameRaw.trim();
    const email = emailRaw.trim();
    const phone = phoneRaw.trim();
    const message = messageRaw.trim();

    // Basic format validation for the required fields.
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }

    const phoneDigits = phone.replace(/[^\d]/g, "");
    if (phoneDigits.length < 7) {
      return NextResponse.json(
        { success: false, error: "Valid phone number is required" },
        { status: 400 }
      );
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!sheetId) throw new Error("GOOGLE_SHEET_ID is not configured");
    if (!clientEmail) throw new Error("GOOGLE_CLIENT_EMAIL is not configured");
    if (!privateKey) throw new Error("GOOGLE_PRIVATE_KEY is not configured");

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Contact!A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[timestamp, name, email, phone, message]],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Contact saved successfully",
    });
  } catch (error) {
    console.error("Contact submission failed:", error);

    const errorMessage =
      error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

