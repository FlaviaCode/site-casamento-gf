import { useState } from 'react';
import QRCode from 'react-qr-code';
import { Copy } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  pixKey: string;
}

export function PaymentModal({ isOpen, onClose, amount, pixKey }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit'>('pix');

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    toast.success('Chave PIX copiada!');
  };

  const handleCreditPayment = () => {
    // Implement InfinityPay integration here
    window.open(`https://infinitypay.io/payment/${amount}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Escolha a forma de pagamento</h2>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setPaymentMethod('pix')}
              className={`flex-1 p-3 rounded-lg border ${
                paymentMethod === 'pix' ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
              }`}
            >
              PIX
            </button>
            <button
              onClick={() => setPaymentMethod('credit')}
              className={`flex-1 p-3 rounded-lg border ${
                paymentMethod === 'credit' ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
              }`}
            >
              Cartão de Crédito
            </button>
          </div>

          {paymentMethod === 'pix' ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <QRCode value={pixKey} size={200} />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Chave PIX</span>
                <button
                  onClick={handleCopyPix}
                  className="flex items-center text-blue-400 hover:text-blue-500"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copiar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-gray-600">
                Valor total: {formatCurrency(amount)}
              </p>
              <button
                onClick={handleCreditPayment}
                className="w-full bg-blue-400 text-white py-3 rounded-lg hover:bg-blue-500"
              >
                Pagar com Cartão
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}