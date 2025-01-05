import { useEffect } from 'react';
import { LoadingHearts } from '../../LoadingHearts';

interface ProcessingStepProps {
  onComplete: () => void;
}

export function ProcessingStep({ onComplete }: ProcessingStepProps) {
  useEffect(() => {
    // Simulate payment processing
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="text-center space-y-4">
      <LoadingHearts className="scale-[2] mx-auto" />
      <p className="text-xl">Implementar método de pagamentos</p>
    </div>
  );
}