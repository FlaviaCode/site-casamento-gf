import { useState } from 'react';
import { cn } from '../../lib/utils';

interface GiftImageProps {
  src: string;
  alt: string;
  status: 'available' | 'partial' | 'received';
}

export function GiftImage({ src, alt, status }: GiftImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
      />
      {status === 'received' && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <span className="text-white font-medium px-4 py-2 bg-green-500/80 rounded-full">
            Presente Recebido
          </span>
        </div>
      )}
    </div>
  );
}