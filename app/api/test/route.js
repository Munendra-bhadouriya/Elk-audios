import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const testPayload = {
      fullName: "Test User (No Razorpay)",
      email: "test@example.com",
      phone: "9999999999",
      company: "Internal QA",
      preferredDateTime: "Tomorrow 5 PM",
      needs: "Google Sheets connectivity test",
      message: "This test entry is submitted from /api/test without Razorpay.",
      status: "TEST_NO_PAYMENT",
      paymentId: "",
      orderId: "",
      amount: 0,
      currency: "",
      paymentMethod: "",
      receipt: "",
      signature: "",
    };

    const res = await fetch(`${req.nextUrl.origin}/api/consultation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testPayload),
    });
    const body = await res.json().catch(() => null);

    return NextResponse.json({
      success: res.ok,
      message: res.ok
        ? "Consultation test posted successfully. Google Sheets is connected."
        : "Consultation test failed.",
      consultationResponse: body,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}