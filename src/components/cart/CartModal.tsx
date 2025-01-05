import { useState } from 'react';
import { X } from 'lucide-react';
import { AlertDialog } from '../AlertDialog';
import { PaymentMethodStep } from './steps/PaymentMethodStep';
import { PaymentFormStep } from './steps/PaymentFormStep';
import { ProcessingStep } from './steps/ProcessingStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { cn } from '../../lib/utils';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

type Step = 'method' | 'form' | 'processing' | 'confirmation';

export function CartModal({ isOpen, onClose, amount }: CartModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>('method');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit' | null>(null);
  const [showExitAlert, setShowExitAlert] = useState(false);

  const handleClose = () => {
    if (currentStep !== 'confirmation') {
      setShowExitAlert(true);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'form':
        setCurrentStep('method');
        break;
      case 'processing':
        setCurrentStep('form');
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    switch (currentStep) {
      case 'method':
        setCurrentStep('form');
        break;
      case 'form':
        setCurrentStep('processing');
        break;
      case 'processing':
        setCurrentStep('confirmation');
        break;
      case 'confirmation':
        onClose();
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {currentStep !== 'method' && (
            <button
              onClick={handleBack}
              className="text-gray-500 hover:text-gray-700"
            >
              Voltar
            </button>
          )}
          <h2 className="text-xl font-semibold text-center flex-1">Carrinho</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className={cn(
          "p-6",
          currentStep === 'processing' && "flex items-center justify-center min-h-[400px]"
        )}>
          {currentStep === 'method' && (
            <PaymentMethodStep
              onSelect={(method) => {
                setPaymentMethod(method);
                handleNext();
              }}
            />
          )}

          {currentStep === 'form' && (
            <PaymentFormStep
              method={paymentMethod!}
              amount={amount}
              onSubmit={handleNext}
            />
          )}

          {currentStep === 'processing' && (
            <ProcessingStep onComplete={handleNext} />
          )}

          {currentStep === 'confirmation' && (
            <ConfirmationStep onClose={onClose} />
          )}
        </div>
      </div>

      <AlertDialog
        isOpen={showExitAlert}
        onClose={() => setShowExitAlert(false)}
        title="Sair do carrinho"
        message="Tem certeza que deseja sair do carrinho?"
        confirmLabel="Sim"
        cancelLabel="Não"
        onConfirm={onClose}
        variant="action"
      />
    </div>
  );
}