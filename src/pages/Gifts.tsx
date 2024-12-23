import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useStore } from '../store/useStore';
import { GiftCard } from '../components/GiftCard/index';
import { PageLoading } from '../components/PageLoading';
import { demoGifts } from '../lib/demo-data';
import type { Gift } from '../types';

export function Gifts() {
  const { gifts, setGifts } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(
        collection(db, 'gifts'),
        (snapshot) => {
          const giftsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Gift[];
          setGifts(giftsData);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      if (!gifts.length) {
        setGifts(demoGifts);
      }
    }
  }, [setGifts, gifts.length]);

  const handleContribute = async (giftId: string, amount: number) => {
    // Implementation for payment processing will go here
    console.log('Contributing', amount, 'to gift', giftId);
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3)',
      }}
    >
      <div className="min-h-screen bg-black/60 py-12 px-4">
        <div className="max-w-[2000px] mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Lista de Presentes
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Escolha um presente especial para nos ajudar a construir nosso novo lar. 
              Sua contribuição será muito importante para nós.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
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
    </div>
  );
}