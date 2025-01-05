import { CreditCard } from 'lucide-react';

interface PaymentMethodStepProps {
  onSelect: (method: 'pix' | 'credit') => void;
}

export function PaymentMethodStep({ onSelect }: PaymentMethodStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl text-center mb-8">Selecione como deseja pagar</h3>
      
      <button
        onClick={() => onSelect('pix')}
        className="w-full p-4 border-2 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center gap-4"
      >
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          PIX
        </div>
        <div className="text-left">
          <p className="font-medium">Pague com PIX</p>
          <p className="text-sm text-gray-500">Pagamento à vista. Aprovação imediata.</p>
        </div>
      </button>

      <button
        onClick={() => onSelect('credit')}
        className="w-full p-4 border-2 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center gap-4"
      >
        <CreditCard className="w-8 h-8 text-gray-700" />
        <div className="text-left">
          <p className="font-medium">Cartão de Crédito</p>
          <p className="text-sm text-gray-500">Pagamento em até 12x</p>
        </div>
      </button>
    </div>
  );
}