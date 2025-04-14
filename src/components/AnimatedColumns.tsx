import { useEffect, useState } from "react";

const AnimatedColumns = () => {
  const [columns, setColumns] = useState(Array(8).fill(true));

  useEffect(() => {
    // Animate columns one by one
    const timeouts = columns.map((_, index) => {
      return setTimeout(() => {
        setColumns(prev => {
          const newColumns = [...prev];
          newColumns[index] = false;
          return newColumns;
        });
      }, index * 100); // 100ms delay between each column
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex">
      {columns.map((isVisible, index) => (
        <div
          key={index}
          className={`h-full w-1/8 bg-black transition-transform duration-500 ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedColumns; 