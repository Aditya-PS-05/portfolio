
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Add Google font for a bolder style - we'll add Syne, a modern geometric font
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);

    return () => {
      // Clean up
      document.head.removeChild(link);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center relative">
      {/* Split background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Left side - light green */}
        <div className="absolute left-0 top-0 w-1/2 h-full bg-[#f4ffc2] z-0"></div>
        {/* Right side - black */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-black z-0"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 
            className="text-[60px] md:text-[120px] lg:text-[180px] leading-none opacity-0 animate-fade-in overflow-hidden"
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
          >
            <span className="text-black inline-block">Adi</span>
            <span className="text-white inline-block">tya</span>
          </h1>
          <div className="w-full h-px bg-black my-4 md:my-6 opacity-0 animate-fade-in animate-delay-100"></div>
          <p className="mt-2 text-lg md:text-2xl opacity-0 animate-fade-in animate-delay-200 font-lora">
            Software Engineer
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
