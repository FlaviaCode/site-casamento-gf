import { useState } from 'react';
import { formatCurrency } from '../../lib/utils';
import { LoadingHearts } from '../LoadingHearts';

interface ContributionFormProps {
  remainingPrice: number;
  onContribute: (amount: number) => void;
  onCancel: () => void;
}

export function ContributionForm({ remainingPrice, onContribute, onCancel }: ContributionFormProps) {
  const [amount, setAmount] = useState(remainingPrice);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onContribute(amount);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
      <div className="space-y-2">
        <label className="block text-xs md:text-sm font-medium text-gray-700 text-center">
          Valor do Presente
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm md:text-base">
            R$
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={1}
            max={remainingPrice}
            className="w-full pl-8 pr-4 py-1.5 md:py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring focus:ring-blue-100 transition-all text-center text-sm md:text-base"
          />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-1.5 md:py-2 text-sm md:text-base text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-1.5 md:py-2 text-sm md:text-base text-white bg-blue-400 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <LoadingHearts className="scale-75" />
              <span>Processando...</span>
            </>
          ) : (
            'Presentear'
          )}
        </button>
      </div>
    </form>
  );
}