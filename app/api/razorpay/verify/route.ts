import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const paymentId = body?.razorpay_payment_id;
    const orderId = body?.razorpay_order_id;
    const signature = body?.razorpay_signature;

    if (!paymentId || !orderId || !signature) {
      return NextResponse.json(
        { success: false, error: "Missing payment verification fields" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { success: false, error: "RAZORPAY_KEY_SECRET is not configured" },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    if (!keyId) {
      return NextResponse.json(
        { success: false, error: "RAZORPAY_KEY_ID is not configured" },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: secret,
    });

    const [payment, order] = await Promise.all([
      razorpay.payments.fetch(paymentId),
      razorpay.orders.fetch(orderId),
    ]);

    return NextResponse.json({
      success: true,
      paymentId,
      orderId,
      signature,
      amount: typeof payment.amount === "number" ? payment.amount / 100 : undefined,
      currency: payment.currency,
      paymentStatus: payment.status,
      paymentMethod: payment.method,
      receipt: order.receipt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment verification failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

