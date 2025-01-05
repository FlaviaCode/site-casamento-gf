import { cn } from '../../lib/utils';

interface GiftProgressProps {
  total: number;
  remaining: number;
  contributors: number;
}

export function GiftProgress({ total, remaining }: GiftProgressProps) {
  const progress = ((total - remaining) / total) * 100;
  
  return (
    <div className="space-y-1">
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs md:text-sm text-gray-500 text-center">
        {Math.round(progress)}% alcançado
      </div>
    </div>
  );
}