import { useEffect } from "react";
import Nav from "@/react-app/components/landing/Nav";
import Hero from "@/react-app/components/landing/Hero";
import ProductExperience from "@/react-app/components/landing/ProductExperience";
import Problem from "@/react-app/components/landing/Problem";
import HowItWorks from "@/react-app/components/landing/HowItWorks";
import InstallApp from "@/react-app/components/landing/InstallApp";
import Differentiators from "@/react-app/components/landing/Differentiators";
import BlogPreview from "@/react-app/components/landing/BlogPreview";
import Footer from "@/react-app/components/landing/Footer";

export default function Home() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    // Small delay to let React finish rendering before scrolling
    const id = setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Nav />
      <div className="pt-14">
      <Hero />
      <ProductExperience />
      <Problem />
      <HowItWorks />
      <InstallApp />
      <Differentiators />
      <BlogPreview />
      <Footer />
      </div>
    </div>
  );
}
