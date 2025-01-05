import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

export function ScrollButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed right-4 bottom-20 md:bottom-6 p-3 bg-blue-400 text-white rounded-full shadow-lg',
        'hover:bg-blue-500 transition-all duration-300 z-40',
        showButton ? 'opacity-100 visible' : 'opacity-0 invisible'
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}