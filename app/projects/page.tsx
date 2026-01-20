"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  IconHome,
  IconMusic,
  IconMicrophone,
  IconBuilding,
  IconDeviceTv,
} from "@tabler/icons-react";
import {
  useTransform,
  useScroll,
  motion,
  useMotionTemplate,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  content: React.ReactNode;
}

const features: Feature[] = [
  {
    icon: <IconHome className="h-8 w-8 text-neutral-200" />,
    title: "Luxury Home Audio Installation",
    description:
      "Seamlessly integrated audio systems that elevate everyday living with pristine sound quality and elegant design.",
    content: (
      <div>
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop"
          alt="Home Audio Installation"
          height={500}
          width={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <IconMusic className="h-8 w-8 text-neutral-200" />,
    title: "Premium Listening Experience",
    description:
      "Immersive soundscapes designed to transform any space into an acoustically perfect environment.",
    content: (
      <div>
        <img
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop"
          alt="Listening Experience"
          height={500}
          width={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <IconDeviceTv className="h-8 w-8 text-neutral-200" />,
    title: "Cinema-Quality Home Theater",
    description:
      "State-of-the-art AV systems that bring the magic of cinema into your home with crystal-clear audio-visual precision.",
    content: (
      <div>
        <img
          src="https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=500&h=500&fit=crop"
          alt="Home Theater"
          height={500}
          width={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <IconBuilding className="h-8 w-8 text-neutral-200" />,
    title: "Commercial Audio Solutions",
    description:
      "Professional audio installations for offices, restaurants, and commercial spaces that enhance atmosphere and functionality.",
    content: (
      <div>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=500&fit=crop"
          alt="Commercial Audio"
          height={500}
          width={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <IconMicrophone className="h-8 w-8 text-neutral-200" />,
    title: "Professional AV Systems",
    description:
      "Advanced audio-visual solutions for conferences, events, and presentations with flawless clarity and reliability.",
    content: (
      <div>
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop"
          alt="Professional AV"
          height={500}
          width={500}
          className="rounded-lg"
        />
      </div>
    ),
  },
];

export default function ProjectsPage() {
  const [firstFeature, ...restFeatures] = features;
  const [isLoaded, setIsLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgrounds = ["#003049", "#2d3436", "#344e41", "#232323", "#403d39"];
  const [background, setBackground] = useState(backgrounds[0]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const finalIndex = Math.floor(latest * backgrounds.length);
    setBackground(backgrounds[finalIndex]);
  });

  return (
    <motion.div
      ref={containerRef}
      className="bg-neutral-900 text-white relative min-h-screen"
    >
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full">
          <Image
            src="/assets/hero section bg temp.jpg"
            alt="Professional audio studio background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Scroll-based Color Tint Overlay */}
          <motion.div
            animate={{
              backgroundColor: background,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
            style={{ opacity: 0.6 }}
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Page Heading - Centered to viewport */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="absolute top-8 md:top-12 lg:top-16 xl:top-20 left-0 right-0 z-10 w-full px-4 text-center pointer-events-none"
      >
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-[1.1] tracking-tight">
            Projects
          </h1>
        </div>
      </motion.div>

      {/* Hero section - first card perfectly centered on load */}
      <section className="flex items-center justify-center relative" style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
        {/* First Card - Centered in space below heading */}
        <div className="mx-auto w-full max-w-4xl px-4 py-10">
          <Card feature={firstFeature} isFirst={true} isLoaded={isLoaded} />
        </div>
      </section>

      {/* Remaining cards scroll below */}
      {restFeatures.length > 0 && (
        <section className="mx-auto flex max-w-4xl flex-col gap-10 px-4 pb-20">
          {restFeatures.map((feature, idx) => (
            <Card key={feature.title ?? idx} feature={feature} />
          ))}
        </section>
      )}
      </div>
    </motion.div>
  );
}

interface CardProps {
  feature: Feature;
  isFirst?: boolean;
  isLoaded?: boolean;
}

const Card = ({ feature, isFirst = false, isLoaded = false }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateContent = useSpring(
    useTransform(scrollYProgress, [0, 1], [200, -300]),
    {
      stiffness: 100,
      damping: 30,
      mass: 1,
    }
  );
  const opacityContent = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const blur = useTransform(scrollYProgress, [0.5, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.8]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  // Smooth fade-in animation for first card's text content
  const textAnimation = isFirst
    ? {
        initial: { opacity: 0, y: 30 },
        animate: isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.3 },
      }
    : {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <div
      ref={ref}
      key={feature.title}
      className="grid grid-cols-1 md:grid-cols-2 items-center gap-20 py-40"
    >
      <motion.div
        className="flex flex-col gap-5"
        style={{
          filter: filter,
          scale: scale,
        }}
        initial={textAnimation.initial}
        animate={textAnimation.animate}
        transition={textAnimation.transition}
      >
        {feature.icon}
        <h2 className="text-4xl font-bold text-white font-heading">
          {feature.title}
        </h2>
        <p className="text-lg text-neutral-400 font-body">
          {feature.description}
        </p>
      </motion.div>

      <motion.div
        style={{
          y: translateContent,
          opacity: opacityContent,
        }}
      >
        {feature.content}
      </motion.div>
    </div>
  );
};
