"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Section_3() {
  const images = [
    "/assets/lifestyle/background/sec_3_slider_1.png",
    "/assets/lifestyle/background/sec_3_slider_2.png",
    "/assets/lifestyle/background/sec_3_slider_3.png"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block relative w-full h-[60%]">

        {/* 🔥 BACKGROUND SLIDER */}
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt="Background"
            fill
            className={`object-cover object-center transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}

        {/* 🔥 OVERLAY */}
        <div className="absolute inset-0 bg-black/20" />

        {/* 🔥 GRID */}
        <div className="relative z-10 grid grid-cols-4 grid-rows-3 h-full">

          <div />
          <div />

          <a className="group bg-[#4F1F44] opacity-100 hover:opacity-90 backdrop-blur-md text-black relative overflow-hidden">
            <Image
              src="/assets/lifestyle/cards/formationbass_dualdriver_desktop.jpg"
              alt="Ear buds"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <p className="absolute inset-0 flex items-center justify-center text-black text-center z-10 font-medium opacity-0 group-hover:opacity-100 transition duration-300 px-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At, id ipsum. Id laboriosam vitae reiciendis ipsum odit iste delectus vero incidunt nam iure, quis quae numquam eos! Eum velit placeat molestias veniam culpa iste repellat maiores officia? Provident reiciendis ex itaque dolor magni nemo, nulla blanditiis qui  iusto?
            </p>
          </a>

          <a className="aspect-square bg-[#4F271F] text-white p-4 flex items-start justify-center items-center text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, id ipsum. Id laboriosam vitae reiciendis ipsum odit iste delectus vero incidunt nam iure, quis quae numquam eos! Eum velit placeat molestias veniam culpa iste repellat maiores officia? Provident reiciendis ex itaque dolor magni nemo, nulla blanditiis qui  iusto?
          </a>

          <div className="col-span-4 " />

          {/* ✅ FIXED BIG CARD */}
          <div className="col-span-2 h-full relative overflow-hidden">
            <Image
              src="/assets/lifestyle/cards/Sec-3_woofers.jpg"
              alt="Woofers"
              fill
              className="object-cover"
            />
          </div>

          {/* CONTROLLER */}
          <div className="aspect-square flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full ${i === current ? "bg-white" : "bg-white/40"
                  }`}
              />
            ))}
          </div>

          <div />

        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden relative w-full aspect-[2/3] overflow-hidden">

        {/* 🔥 BACKGROUND SLIDER (FIXED) */}
        <div className="absolute top-[20%] left-0 w-full h-[80%] overflow-hidden">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[5000ms] ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              <Image
                key={index}
                src={img}
                alt="Background"
                fill
                className={`object-cover object-center transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"
                  }`}
              />
            </div>
          ))}

          {/* overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* 🔥 GRID */}
        <div className="relative z-10 grid grid-cols-2 grid-rows-5 h-full">

          {/* ROW 1 */}
          <a className="aspect-square group bg-[#4F1F44] opacity-100 hover:opacity-90 backdrop-blur-md text-black relative overflow-hidden flex items-center justify-center">
            <Image
              src="/assets/lifestyle/cards/formationbass_dualdriver_desktop.jpg"
              alt="Ear buds"
              fill
              className="object-cover transition duration-500 group-hover:scale-11s0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <p className="absolute inset-0 text-white flex items-center justify-center text-black text-center z-10 font-medium opacity-0 group-hover:opacity-100 transition duration-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At, id ipsum. Id laboriosam vitae reiciendis ipsum odit iste delectus
            </p>
          </a>

          <a className="aspect-square bg-[#6b2c1f] text-white flex items-center justify-center">
            Tickets & Info
          </a>

          {/* ROW 2 */}
          <div />
          <div />

          {/* ROW 3 */}
          <div />
          <div />

          {/* ROW 4 (CONTROLLER CENTERED PERFECTLY) */}
          <div />
          <div className="flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full ${i === current ? "bg-white" : "bg-white/40"
                  }`}
              />
            ))}
          </div>

          {/* ROW 5 (FIXED HEIGHT MATCH) */}
          <div className="col-span-2 h-full bg-[#c9904a] scale-100 text-white flex items-center justify-center overflow-hidden relative ">
            <Image
              src="/assets/lifestyle/cards/Sec-3_woofers.jpg"
              alt="Woofers"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>

    </div>
  );
}