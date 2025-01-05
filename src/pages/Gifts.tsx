import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { GiftCard } from '../components/GiftCard/index';
import { PageLoading } from '../components/PageLoading';
import { ScrollButton } from '../components/ScrollButton';
import { subscribeToGifts } from '../services/firebase/gifts';
import type { Gift } from '../types';

export function Gifts() {
  const { gifts, setGifts } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToGifts((updatedGifts) => {
      setGifts(updatedGifts);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setGifts]);

  const handleContribute = async (giftId: string, amount: number) => {
    // Implementation for payment processing will go here
    console.log('Contributing', amount, 'to gift', giftId);
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed pb-20 md:pb-0"
      style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3)',
      }}
    >
      <div className="min-h-screen bg-black/60 py-8 md:py-12 px-3 md:px-4">
        <div className="max-w-[2000px] mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              Lista de Presentes
            </h1>
            <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto px-2">
              Escolha um presente especial para nos ajudar a construir nosso novo lar. 
              Sua contribuição será muito importante para nós.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-6">
            {gifts.map((gift) => (
              <GiftCard
                key={gift.id}
                gift={gift}
                onContribute={handleContribute}
              />
            ))}
          </div>
        </div>
      </div>
      <ScrollButton />
    </div>
  );
}