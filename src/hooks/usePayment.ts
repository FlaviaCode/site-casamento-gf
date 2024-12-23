import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Gift } from '../types';
import toast from 'react-hot-toast';

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false);

  const processPayment = async (
    giftId: string,
    amount: number,
    method: 'pix' | 'credit'
  ) => {
    setIsProcessing(true);
    try {
      const giftRef = doc(db, 'gifts', giftId);
      const gift = (await giftRef.get()).data() as Gift;
      
      await updateDoc(giftRef, {
        remainingPrice: gift.remainingPrice - amount,
        contributors: gift.contributors + 1,
        status: gift.remainingPrice - amount <= 0 ? 'received' : 'partial'
      });

      toast.success('Pagamento processado com sucesso!');
    } catch (error) {
      toast.error('Erro ao processar pagamento.');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return { processPayment, isProcessing };
}