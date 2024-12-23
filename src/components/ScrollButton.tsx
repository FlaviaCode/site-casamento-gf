import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export function ScrollButton() {
  const [showButtons, setShowButtons] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setShowButtons(scrollY > 100); // Reduced threshold to show buttons earlier
      setAtBottom(scrollY + windowHeight >= documentHeight - 100);
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (position: 'top' | 'bottom') => {
    const target = position === 'top' ? 0 : document.documentElement.scrollHeight;
    window.scrollTo({
      top: target,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-40">
      {showButtons && !atBottom && (
        <button
          onClick={() => scrollTo('bottom')}
          className="p-2 bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-500 transition-colors animate-fadeIn"
          aria-label="Scroll to bottom"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      )}
      {showButtons && (
        <button
          onClick={() => scrollTo('top')}
          className={cn(
            "p-2 bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-500 transition-colors",
            "animate-slideIn"
          )}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}