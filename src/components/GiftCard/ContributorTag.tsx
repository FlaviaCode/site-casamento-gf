import { cn } from '../../lib/utils';

interface ContributorTagProps {
  count: number;
  className?: string;
}

export function ContributorTag({ count, className }: ContributorTagProps) {
  if (count === 0) return null;

  return (
    <div 
      className={cn(
        "absolute top-3 right-3 bg-blue-400/90 backdrop-blur-sm",
        "text-white px-3 py-1 rounded-full text-sm font-medium",
        "shadow-lg transform transition-transform duration-300",
        "hover:scale-105",
        className
      )}
    >
      {count} já {count === 1 ? 'ajudou' : 'ajudaram'}
    </div>
  );
}