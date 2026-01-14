import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Category from "@/components/Category";
import Preloader from "@/components/Preloader";
import { PreloaderProvider } from "@/contexts/PreloaderContext";

export default function Home() {
  return (
    <PreloaderProvider>
      <main className="min-h-screen relative">
        <Header />
        <Hero />
        <AboutUs />
        <Category />
        <Preloader />
      </main>
    </PreloaderProvider>
  );
}
