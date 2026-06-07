"use client";

import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: "luxury-home-audio-installation",
    title: "Luxury Home Audio Installation",
    img: "https://plus.unsplash.com/premium_photo-1680297665011-597de783fb92?w=500&h=500&fit=crop&auto=format&q=80",
  },
  {
    id: "premium-listening-experience",
    title: "Premium Listening Experience",
    img: "https://images.unsplash.com/photo-1737885197886-9e34a03ad226?w=500&h=500&fit=crop&auto=format&q=80",
  },
  {
    id: "cinema-quality-home-theater",
    title: "Cinema-Quality Home Theater",
    img: "https://images.unsplash.com/photo-1662454420647-3d20ddcdb8f8?w=500&h=500&fit=crop&auto=format&q=80",
  },
  {
    id: "commercial-audio-solutions",
    title: "Commercial Audio Solutions",
    img: "https://images.unsplash.com/photo-1632582204758-5ac65783517a?w=500&h=500&fit=crop&auto=format&q=80",
  },
  {
    id: "professional-av-systems",
    title: "Professional AV Systems",
    img: "https://images.unsplash.com/photo-1621976975813-10e88ae6e450?w=500&h=500&fit=crop&auto=format&q=80",
  },
];

export default function Projects() {
  return (
    <section
      className="team-section !py-10 md:!py-14"
      aria-labelledby="team-heading"
    >
      <div className="relative w-full">
        {/* Height = card strip only so "PROJECTS" centers to the cards, not the button */}
        <div className="relative w-full">
          <div className="team-text pointer-events-none text-white !flex !h-full !min-h-0 !flex-col !justify-center !items-start">
            <h2
              id="team-heading"
              className="[text-shadow:0_2px_16px_rgba(0,0,0,0.55)]"
            >
              PROJECTS
            </h2>
          </div>

          <div className="team-scroll w-full items-start pb-8 md:pb-12">
            <div className="team-card spacer" aria-hidden />
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects#${project.id}`}
                scroll
                aria-label={`${project.title} — open on Projects page`}
                className="team-card !h-auto self-start !border-0 !bg-[#0f172a] block overflow-hidden p-0 text-inherit no-underline transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/80"
              >
                <div className="relative isolate h-[280px] w-full shrink-0 overflow-hidden bg-[#0f172a] leading-[0] sm:h-[320px] md:h-[380px] [&>span]:!absolute [&>span]:inset-0 [&>span]:block [&>span]:size-full [&>span]:leading-[0]">
                  <Image
                    src={project.img}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 260px, 320px"
                    className="!block object-cover object-center"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 pb-4 pt-14">
                    <h3 className="text-base font-semibold leading-snug text-white sm:text-lg [text-shadow:0_2px_14px_rgba(0,0,0,0.75),0_1px_3px_rgba(0,0,0,0.9)]">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-6 md:pt-8">
          <Link
            href="/projects"
            className="projects-view-more pointer-events-auto shrink-0"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
