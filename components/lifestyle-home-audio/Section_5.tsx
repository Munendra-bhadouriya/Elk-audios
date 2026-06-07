"use client";

import Image from "next/image";

export default function Section_5() {
  return (
    <>
      <section className="relative w-full h-screen md:h-screen overflow-hidden bg-[#1F1D1B]">

        {/* 🔥 BACKGROUND IMAGE (ONLY DESKTOP) */}
        <div className="hidden md:block">
        </div>

        {/* 🔥 OVERLAY (ONLY DESKTOP) */}
        <div className="hidden md:block absolute inset-0 bg-black/20 z-0" />

        {/* 🔥 GRID */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 h-auto md:h-full">

          {/* CARD 1 */}
          <a className="group aspect-square md:aspect-auto bg-[#ffffff] opacity-100 hover:opacity-90 backdrop-blur-md text-black relative overflow-hidden">
            <Image
              src="/assets/lifestyle/cards/close_up_speaker.webp"
              alt="Speaker"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <p className="absolute inset-0 flex items-center justify-center text-black text-center z-10 font-medium opacity-0 group-hover:opacity-100 transition duration-300 px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, id ipsum. Id laboriosam vitae reiciendis ipsum odit iste delectus vero incidunt nam iure, quis quae numquam eos! Eum velit placeat molestias veniam culpa iste repellat maiores officia? Provident reiciendis ex itaque dolor magni nemo, nulla blanditiis qui  iusto?
            </p>
          </a>

          {/* CARD 2 */}
          <a className="group aspect-square md:aspect-auto bg-[#ffffff] opacity-100 hover:opacity-90 backdrop-blur-md text-black relative overflow-hidden">
            <Image
              src="/assets/lifestyle/cards/AP_Hero_-_Drumfire_W-2.jpg"
              alt="Speaker"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <p className="absolute inset-0 flex items-center justify-center text-black text-center z-10 font-medium opacity-0 group-hover:opacity-100 transition duration-300 px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, id ipsum. Id laboriosam vitae reiciendis ipsum odit iste delectus vero incidunt nam iure, quis quae numquam eos! Eum velit placeat molestias veniam culpa iste repellat maiores officia? Provident reiciendis ex itaque dolor magni nemo, nulla blanditiis qui  iusto?
            </p>
          </a>

          {/* TOP RIGHT EMPTY (ONLY DESKTOP) */}
          <div className="hidden md:block md:col-span-2" />

          {/* CARD 3 */}
          <a className="group aspect-square md:aspect-auto bg-[#ffffff] opacity-100 hover:opacity-90 backdrop-blur-md text-black relative overflow-hidden">
            <Image
              src="/assets/lifestyle/cards/Hero-A10MkII-W.jpg"
              alt="Speaker"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <p className="absolute inset-0 flex items-center justify-center text-black text-center z-10 font-medium opacity-0 group-hover:opacity-100 transition duration-300 px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, id ipsum. Id laboriosam vitae reiciendis ipsum odit iste delectus vero incidunt nam iure, quis quae numquam eos! Eum velit placeat molestias veniam culpa iste repellat maiores officia? Provident reiciendis ex itaque dolor magni nemo, nulla blanditiis qui  iusto?
            </p>
          </a>

          {/* BOTTOM EMPTY (ONLY DESKTOP) */}
          <div className="hidden md:block md:col-span-3" />

        </div>

      </section>

      {/* ✅ LOCAL CSS (SAFE) */}
      <style jsx>{`
        @media (max-width: 768px) {
          .h-screen {
            height: auto;
          }
        }
      `}</style>
    </>
  );
}