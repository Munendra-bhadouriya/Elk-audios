import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Projects from "@/components/projects";
import Preloader from "@/components/Preloader";
import { PreloaderProvider } from "@/contexts/PreloaderContext";
import ProjectsTestimonials from "@/components/ProjectsTestimonials";
import Category from "@/components/Category";

export default function Home() {
  return (
    <PreloaderProvider>
      <main className="min-h-screen relative">
        <Hero />
        <AboutUs />
        <Category/>
        <Projects />
        {/* ProjectsTestimonialsSwiper temporarily removed on request uday singh */}
        <Preloader />
      </main>
    </PreloaderProvider>
  );
}
