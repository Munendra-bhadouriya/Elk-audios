import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay environment variables not configured" },
        { status: 500 }
      );
    }

    const amountInPaise =
      Number.parseInt(process.env.RAZORPAY_CONSULTATION_AMOUNT_PAISE || "", 10) || 100;

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `consultation_${Date.now()}`,
      notes: {
        purpose: "consultation_booking",
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      receipt: order.receipt,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create Razorpay order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

