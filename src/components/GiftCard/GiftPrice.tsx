import { formatCurrency } from '../../lib/utils';

interface GiftPriceProps {
  remainingPrice: number;
}

export function GiftPrice({ remainingPrice }: GiftPriceProps) {
  return (
    <p className="text-gray-600 text-center">
      Valor restante: <span className="font-bold text-[17px]">{formatCurrency(remainingPrice)}</span>
    </p>
  );
}