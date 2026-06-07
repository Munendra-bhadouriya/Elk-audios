"use client";

import Image from "next/image";

export default function Section_4() {
  return (
    <div className="w-full">

      {/* ================= DESKTOP (UNCHANGED) ================= */}
      <div className="hidden md:block w-full h-[40%]">

        <div className="grid grid-cols-4 grid-rows-2 h-full">

          {/* LEFT TOP CARD */}
          <a className="group bg-[#ffffff] opacity-100 hover:opacity-90 backdrop-blur-md text-black relative overflow-hidden">
            <Image
              src="/assets/lifestyle/cards/half_cut_speaker.webp"
              alt="Speaker"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <p className="absolute inset-0 flex items-center justify-center text-black text-center z-10 font-medium opacity-0 group-hover:opacity-100 transition duration-300 px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, id ipsum. Id laboriosam vitae reiciendis ipsum odit iste delectus vero incidunt nam iure, quis quae numquam eos! Eum velit placeat molestias veniam culpa iste repellat maiores officia? Provident reiciendis ex itaque dolor magni nemo, nulla blanditiis qui  iusto?
            </p>
          </a>

          {/* VIDEO (3x2) */}
          <a className="col-span-3 row-span-2 relative overflow-hidden bg-black">

            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/assets/lifestyle/cards/earbuds_video.mp4" type="video/mp4" />
            </video>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">

            </div>

          </a>

          {/* LEFT BOTTOM CARD */}
          <a className="aspect-square bg-[#e5e1d8] flex items-center justify-center  group bg-[#ffffff] opacity-100 hover:opacity-90 backdrop-blur-md text-black relative overflow-hidden">
          <Image
              src="/assets/lifestyle/cards/Formation-Duo-Black_Image_4.jpg"
              alt="Speaker"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <p className="absolute inset-0 flex items-center justify-center text-black text-center z-10 font-medium opacity-0 group-hover:opacity-100 transition duration-300 px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, id ipsum. Id laboriosam vitae reiciendis ipsum odit iste delectus vero incidunt nam iure, quis quae numquam eos! Eum velit placeat molestias veniam culpa iste repellat maiores officia? Provident reiciendis ex itaque dolor magni nemo, nulla blanditiis qui  iusto?
            </p>
          </a>

        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden w-full aspect-[2/3]">

        <div className="grid grid-cols-2 grid-rows-3 h-full">

          {/* 🔥 VIDEO (ROWS 1–2 FULL WIDTH) */}
          <a className="col-span-2 row-span-2 relative overflow-hidden">

            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/assets/lifestyle/cards/earbuds_video.mp4" type="video/mp4" />
            </video>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">

            </div>

          </a>

          {/* 🔥 BOTTOM LEFT CARD */}
          <a className="aspect-square bg-[#3b2a1f] text-white flex items-end justify-center p-4 overflow-hidden relative">
            <Image
              src="/assets/lifestyle/cards/half_cut_speaker.webp"
              alt="Speaker"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <p className="absolute inset-0 flex items-center justify-center text-black text-center z-10 font-medium opacity-0 group-hover:opacity-100 transition duration-300 px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, id ipsum. Id laboriosam vitae reiciendis ipsum odit iste delectus vero incidunt nam iure, quis quae numquam eos! Eum velit placeat molestias veniam culpa iste repellat maiores officia? Provident reiciendis ex itaque dolor magni nemo, nulla blanditiis qui  iusto?
            </p>
          </a>

          {/* 🔥 BOTTOM RIGHT CARD */}
          <a className="aspect-square bg-[#e5e1d8] flex items-center justify-center overflow-hidden relative">
            <Image
              src="/assets/lifestyle/cards/Formation-Duo-Black_Image_4.jpg"
              alt="Speaker"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <p className="absolute inset-0 flex items-center justify-center text-black text-center z-10 font-medium opacity-0 group-hover:opacity-100 transition duration-300 px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, id ipsum. Id laboriosam vitae reiciendis ipsum odit iste delectus vero incidunt nam iure, quis quae numquam eos! Eum velit placeat molestias veniam culpa iste repellat maiores officia? Provident reiciendis ex itaque dolor magni nemo, nulla blanditiis qui  iusto?
            </p>
          </a>

        </div>
      </div>

    </div>
  );
}