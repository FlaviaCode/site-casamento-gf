import { useState } from 'react';
import { Gift } from '../../types';
import { GiftImage } from './GiftImage';
import { GiftProgress } from './GiftProgress';
import { ContributionForm } from './ContributionForm';
import { GiftTitle } from './GiftTitle';
import { GiftPrice } from './GiftPrice';
import { ContributorsTag } from './ContributorsTag';
import { PresentButton } from './PresentButton';
import { CartModal } from '../cart/CartModal';

interface GiftCardProps {
  gift: Gift;
  onContribute: (giftId: string, amount: number) => Promise<void>;
}

export function GiftCard({ gift, onContribute }: GiftCardProps) {
  const [showContribution, setShowContribution] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleContribute = async (amount: number) => {
    setSelectedAmount(amount);
    setShowCart(true);
    setShowContribution(false);
  };

  const handleCartClose = () => {
    setShowCart(false);
    setSelectedAmount(0);
  };

  return (
    <>
      <div className="group bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        <div className="relative">
          <GiftImage
            src={gift.image}
            alt={gift.name}
            status={gift.status}
          />
          <ContributorsTag count={gift.contributors} />
        </div>
        
        <div className="p-3 md:p-6 flex-1 flex flex-col">
          <div className="text-center space-y-2 md:space-y-4 flex-grow">
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
            <div className="mt-auto pt-3 md:pt-6">
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

      <CartModal 
        isOpen={showCart}
        onClose={handleCartClose}
        amount={selectedAmount}
      />
    </>
  );
}