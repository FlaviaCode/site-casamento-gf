import { useState } from 'react';
import { Gift } from '../../types';
import { GiftImage } from './GiftImage';
import { GiftProgress } from './GiftProgress';
import { ContributionForm } from './ContributionForm';
import { GiftTitle } from './GiftTitle';
import { GiftPrice } from './GiftPrice';
import { ContributorsTag } from './ContributorsTag';
import { PresentButton } from './PresentButton';

interface GiftCardProps {
  gift: Gift;
  onContribute: (giftId: string, amount: number) => Promise<void>;
}

export function GiftCard({ gift, onContribute }: GiftCardProps) {
  const [showContribution, setShowContribution] = useState(false);

  const handleContribute = async (amount: number) => {
    await onContribute(gift.id, amount);
    setShowContribution(false);
  };

  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative">
        <GiftImage
          src={gift.image}
          alt={gift.name}
          status={gift.status}
        />
        <ContributorsTag count={gift.contributors} />
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-center space-y-4 flex-grow">
          <GiftTitle name={gift.name} />
          
          {gift.status !== 'received' && (
            <div className="space-y-2">
              <GiftPrice remainingPrice={gift.remainingPrice} />
              <GiftProgress
                total={gift.totalPrice}
                remaining={gift.remainingPrice}
                contributors={gift.contributors}
              />
            </div>
          )}
        </div>

        {gift.status !== 'received' && (
          <div className="mt-auto pt-6">
            {!showContribution ? (
              <PresentButton onClick={() => setShowContribution(true)} />
            ) : (
              <ContributionForm
                remainingPrice={gift.remainingPrice}
                onContribute={handleContribute}
                onCancel={() => setShowContribution(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}