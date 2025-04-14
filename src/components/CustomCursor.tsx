import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOverText, setIsOverText] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Remove hover class from all elements first
      document.querySelectorAll('.cursor-hover').forEach(el => {
        el.classList.remove('cursor-hover');
      });
      
      // Check if cursor is over a text element
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const isText = element?.tagName === 'P' || 
                    element?.tagName === 'SPAN' || 
                    element?.tagName === 'A' || 
                    element?.tagName === 'H1' || 
                    element?.tagName === 'H2' || 
                    element?.tagName === 'H3' || 
                    element?.tagName === 'H4' || 
                    element?.tagName === 'H5' || 
                    element?.tagName === 'H6';
      
      setIsOverText(!!isText);
      
      // Add hover effect to text elements
      if (isText && element) {
        element.classList.add('cursor-hover');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`w-4 h-4 rounded-full transition-all duration-200 ${
          isOverText ? 'bg-white border-2 border-white scale-150' : 'bg-white'
        }`}
      />
    </div>
  );
};

export default CustomCursor; 