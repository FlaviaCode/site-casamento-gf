import { cn } from '../lib/utils';
import { Heart } from 'lucide-react';

interface LoadingHeartsProps {
  className?: string;
}

export function LoadingHearts({ className }: LoadingHeartsProps) {
  return (
    <div className={cn("relative flex items-center justify-center h-8 w-8", className)}>
      {[0, 1, 2].map((i) => (
        <Heart
          key={i}
          className="absolute w-8 h-8 text-blue-400"
          style={{
            animation: `heartBeat 1.2s ease-in-out ${i * 0.4}s infinite`,
            opacity: 0.8,
          }}
          fill="currentColor"
        />
      ))}
    </div>
  );
}