
import { useState, useEffect } from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkDarkSections = () => {
      // Get all elements with the black or dark background
      const darkSections = document.querySelectorAll('.bg-black');
      
      if (darkSections.length === 0) return;
      
      const headerHeight = 80; // Approximate header height
      const scrollPosition = window.scrollY + headerHeight;
      
      // Check if the navbar is over any dark section
      let overDark = false;
      darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = rect.bottom + window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          overDark = true;
        }
      });
      
      setIsOverDarkSection(overDark);
    };

    const handleScroll = () => {
      // Only track scroll for dark section detection, not for background change
      checkDarkSections();
    };

    window.addEventListener("scroll", handleScroll);
    // Run once on mount to check initial position
    checkDarkSections();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-6 transition-all duration-300">
      <div className="container-custom flex justify-between items-center">
        <a href="#" className="font-display text-2xl md:text-3xl font-bold">
          Aditya.
        </a>
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex space-x-8">
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn(
                  "font-medium text-lg font-bold transition-colors hover:text-black/70",
                  isOverDarkSection ? "text-white hover:text-white/70" : "text-black"
                )}
                href="#about"
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn(
                  "font-medium text-lg font-bold transition-colors hover:text-black/70",
                  isOverDarkSection ? "text-white hover:text-white/70" : "text-black"
                )}
                href="#experience"
              >
                Experience
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn(
                  "font-medium text-lg font-bold transition-colors hover:text-black/70",
                  isOverDarkSection ? "text-white hover:text-white/70" : "text-black"
                )}
                href="#projects"
              >
                Work
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn(
                  "font-medium text-lg font-bold transition-colors hover:text-black/70",
                  isOverDarkSection ? "text-white hover:text-white/70" : "text-black"
                )}
                href="#contact"
              >
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="md:hidden">
          <button className={cn(
            "p-2",
            isOverDarkSection ? "text-white" : "text-black"
          )}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
