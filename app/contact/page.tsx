"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // ✅ CLEAN SUBMIT (NO RAZORPAY)
  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error(result.error);
        alert(result?.error || "Something went wrong");
        return;
      }

      reset();
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error sending message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative bg-slate-900 text-white min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/assets/IMG_6506.JPG"
          alt="Contact background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/70"></div>
      </div>

      {/* HERO */}
      <section className="relative z-10 py-20 border-b border-gray-800/50 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Get In Touch
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Ready to transform your space? Let’s talk.
        </p>
      </section>

      {/* FORM SECTION */}
      <section ref={sectionRef} className="relative z-10 py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT TEXT */}
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Contact Us
              </h2>
              <p className="text-gray-300 mb-6">
                Tell us about your project and we’ll get back to you.
              </p>

              <Link href="/consultation">
                <button className="border px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
                  Book Consultation
                </button>
              </Link>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 bg-slate-800/40 p-8 rounded-2xl border border-white/10 backdrop-blur"
            >
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: true })}
                className="w-full p-4 rounded-lg bg-black/30 border border-white/10"
              />

              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="w-full p-4 rounded-lg bg-black/30 border border-white/10"
              />

              <input
                type="tel"
                placeholder="Phone"
                {...register("phone", { required: true })}
                className="w-full p-4 rounded-lg bg-black/30 border border-white/10"
              />

              <textarea
                placeholder="Your Message"
                rows={5}
                {...register("message", { required: true })}
                className="w-full p-4 rounded-lg bg-black/30 border border-white/10"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full border border-white hover:bg-white hover:text-black transition"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CONTACT DETAILS */}
      <section className="relative z-10 py-20 border-t border-gray-800/50 text-center">
        <h2 className="text-4xl font-bold mb-10">Contact Details</h2>

        <p className="text-gray-300 mb-2">
          info@elkaudios.com
        </p>

        <p className="text-gray-300 mb-2">
          +1 (555) 123-4567
        </p>

        <p className="text-gray-300">
          San Francisco, CA
        </p>
      </section>

      {/* MAP */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto h-[400px] rounded-2xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.702339408982!2d77.43850189999999!3d23.217516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c430000ddddf1%3A0xa7d86503fe0c0be5!2sELK%20Audios!5e0!3m2!1sen!2sin!4v1769250464080!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}