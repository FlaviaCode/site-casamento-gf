import { cn } from '../../lib/utils';

interface GiftTitleProps {
  name: string;
}

export function GiftTitle({ name }: GiftTitleProps) {
  return (
    <h3 className="text-lg text-gray-900 group-hover:text-blue-500 transition-colors text-center">
      {name}
    </h3>
  );
}