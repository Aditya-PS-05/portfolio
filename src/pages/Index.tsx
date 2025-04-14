
import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  useEffect(() => {
    // Apply animations to elements as they enter viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="bg-[#f4ffc2]">
      <Header />
      <Hero />
      <div className="container-custom py-12">
        <Separator className="h-1 bg-black" />
      </div>
      <About />
      <div className="container-custom py-12">
        <Separator className="h-1 bg-black" />
      </div>
      <Experience />
      <div className="container-custom py-12">
        <Separator className="h-1 bg-black" />
      </div>
      <Projects />
      <div className="container-custom py-12">
        <Separator className="h-1 bg-black" />
      </div>
      <Contact />
      <div className="container-custom py-12">
        <Separator className="h-1 bg-black" />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
