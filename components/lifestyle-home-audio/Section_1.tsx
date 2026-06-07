"use client";

import Image from "next/image";
import { useState } from "react";
import { lifestyleCards } from "@/data/lifestyleCards";

export default function Section_1() {
  const [hovered, setHovered] = useState<string | null>(null);

  const main = lifestyleCards[0];
  const who = lifestyleCards[1];
  const lifestyle = lifestyleCards[2];

  return (
    <section className="relative w-full overflow-hidden md:min-h-screen md:h-[115vh]">

      {/* ================= MOBILE ================= */}
      <div className="md:hidden w-full aspect-[1/1] flex flex-col">

        {/* BACKGROUND */}
        <Image
          src="/assets/lifestyle/background/AP_Hero_-_Drumfire_W-2.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-0" />

        {/* GREEN (UNCHANGED) */}
        <a className="bg-[#3b3f46] flex flex-1 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <p className="relative z-10 text-white text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim, iure?ipsum dolor sit amet consectetur adipisicing elit...
          </p>
        </a>

        {/* WHITE + BEIGE */}
        <div className="flex flex-1">

          {/* WHITE */}
          <a className="group bg-[#404040] w-1/2 relative overflow-hidden">

            {/* IMAGE */}
            <Image
              src="/assets/lifestyle/cards/black-earbuds.png"
              alt={who.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            {/* TEXT */}
            <p className="absolute inset-0 flex items-center justify-center text-white text-center z-10 opacity-0 group-hover:opacity-100 transition duration-300 px-2">
              {who.title}
            </p>
          </a>

          {/* BEIGE */}
          <a className="group bg-[#2a2623] w-1/2 relative overflow-hidden">

            <Image
              src="/assets/lifestyle/cards/ear_buds.png"
              alt={lifestyle.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <p className="absolute inset-0 flex items-center justify-center text-white text-center z-10 opacity-0 group-hover:opacity-100 transition duration-300 px-2">
              {lifestyle.title}
            </p>
          </a>

        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block w-full h-full">

        {/* BACKGROUND */}
        <Image
          src="/assets/lifestyle/background/earbuds_bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-0" />

        <div className="relative z-10 grid grid-cols-4 grid-rows-2 h-full">

          <div className="col-span-2" />

          {/* GREEN (UNCHANGED) */}
          <a
            href={main.link}
            className="group col-span-2 relative overflow-hidden bg-[#3b3f46] hover:opacity-100 flex items-center justify-center text-center px-6"
          >
            {/* Bottom gray gradient overlay on hover */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

            {/* Always visible text */}
            <p className="relative z-10 text-white text-2xl font-semibold px-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim, iure?ipsum dolor sit amet consectetur adipisicing elit...
            </p>
          </a>

          {/* WHITE */}
          <div
            onMouseEnter={() => setHovered(who.id)}
            onMouseLeave={() => setHovered(null)}
            className="group bg-[#404040] hover:opacity backdrop-blur-md text-black relative overflow-hidden"
          >
            <Image
              src="/assets/lifestyle/cards/black-earbuds.png"
              alt={who.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <p className="absolute inset-0 flex items-center justify-center text-white text-center z-10 font-medium opacity-0 group-hover:opacity-100 transition duration-300 px-4">
              {who.title}
            </p>
          </div>

          {/* BEIGE */}
          <a
            href={lifestyle.link}
            onMouseEnter={() => setHovered(lifestyle.id)}
            onMouseLeave={() => setHovered(null)}
            className="group bg-[#2a2623] hover:backdrop-blur-md text-black relative overflow-hidden"
          >
            <Image
              src="/assets/lifestyle/cards/ear_buds.png"
              alt={lifestyle.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <p className="absolute inset-0 flex items-center justify-center text-white text-center z-10 font-medium opacity-0 group-hover:opacity-100 transition duration-300 px-4">
              {lifestyle.title}
            </p>
          </a>

          <div className="col-span-2" />

        </div>
      </div>

    </section>
  );
}