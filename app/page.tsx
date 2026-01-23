import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Category from "@/components/Category";
import Preloader from "@/components/Preloader";
import { PreloaderProvider } from "@/contexts/PreloaderContext";

export default function Home() {
  return (
    <PreloaderProvider>
      <main className="min-h-screen relative">
        <Hero />
        <AboutUs />
        <Category />
        {/* ProjectsTestimonialsSwiper temporarily removed on request */}
        <Preloader />
      </main>
    </PreloaderProvider>
  );
}
