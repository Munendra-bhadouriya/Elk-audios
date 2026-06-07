import crypto from "crypto";
import Link from "next/link";
import { notFound } from "next/navigation";

type SuccessPageProps = {
  searchParams: {
    payment_id?: string;
    order_id?: string;
    signature?: string;
  };
};

export default function ConsultationSuccessPage({ searchParams }: SuccessPageProps) {
  const paymentId = searchParams.payment_id;
  const orderId = searchParams.order_id;
  const signature = searchParams.signature;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!paymentId || !orderId || !signature || !secret) {
    notFound();
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (expectedSignature !== signature) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Payment Successful</h1>
        <p className="mt-4 text-emerald-100/90">
          Your consultation request has been confirmed and saved successfully.
        </p>
        <p className="mt-2 text-sm text-emerald-200/80">Payment ID: {paymentId}</p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 hover:bg-white hover:text-slate-900 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

