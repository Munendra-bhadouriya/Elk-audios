"use client";

import Image from "next/image";

export default function ProjectsTestimonials() {
  // Placeholder images - replace with actual project/testimonial images
  const items = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1523437237164-d442d57cc3c9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 1",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1421930866250-aa0594cea05c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 2",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1536152470836-b943b246224c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 3",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1491824989090-cc2d0b57eb0d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 4",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1518717202715-9fa9d099f58a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 5",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 6",
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1421930866250-aa0594cea05c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 7",
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1459213599465-03ab6a4d5931?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 8",
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 9",
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1453791052107-5c843da62d97?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 10",
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1471978445661-ad6ec1f5ba50?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 11",
    },
    {
      id: 12,
      image: "https://images.unsplash.com/photo-1523978591478-c753949ff840?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 12",
    },
    {
      id: 13,
      image: "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 13",
    },
    {
      id: 14,
      image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 14",
    },
    {
      id: 15,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 15",
    },
    {
      id: 16,
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 16",
    },
    {
      id: 17,
      image: "https://images.unsplash.com/photo-1495312040802-a929cd14a6ab?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 17",
    },
    {
      id: 18,
      image: "https://images.unsplash.com/photo-1465147264724-326b45c3c59b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 18",
    },
    {
      id: 19,
      image: "https://images.unsplash.com/photo-1421930866250-aa0594cea05c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 19",
    },
    {
      id: 20,
      image: "https://images.unsplash.com/photo-1584148721201-b6432e0d5106?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&w=300&q=80",
      alt: "Project 20",
    },
  ];

  return (
    <section className="projects-testimonials py-16 bg-slate-900">
      <div className="flex items-center">
        <h2 className="text-4xl font-bold text-white whitespace-nowrap transform -rotate-90 origin-center ml-8">
          Projects and Testimonials
        </h2>
        <div className="track-wrapper flex-1 w-[80%] max-w-6xl mx-auto">
          <ul className="track">
            {items.map((item) => (
              <li key={item.id} className="track__item">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
