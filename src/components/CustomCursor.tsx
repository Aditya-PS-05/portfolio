import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOverText, setIsOverText] = useState(false);
  const [cursorSize, setCursorSize] = useState(16); // Default size in pixels

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
      
      // Calculate cursor size based on text size
      if (isText && element) {
        const computedStyle = window.getComputedStyle(element);
        const fontSize = parseFloat(computedStyle.fontSize);
        
        // Calculate cursor size based on font size
        // For small text (less than 20px), use 1.5x the font size
        // For medium text (20px to 40px), use 1.2x the font size
        // For large text (greater than 40px), use 1x the font size
        let newSize = 16; // Default size
        if (fontSize < 20) {
          newSize = fontSize * 1.5;
        } else if (fontSize <= 40) {
          newSize = fontSize * 1.2;
        } else {
          newSize = fontSize;
        }
        
        // Ensure minimum and maximum sizes
        newSize = Math.max(16, Math.min(100, newSize));
        
        setCursorSize(newSize);
        element.classList.add('cursor-hover');
      } else {
        // Reset to default size when not over text
        setCursorSize(16);
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
        className={`rounded-full transition-all duration-300 ${
          isOverText ? 'bg-white border-2 border-white' : 'bg-white'
        }`}
        style={{
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
        }}
      />
    </div>
  );
};

export default CustomCursor; 