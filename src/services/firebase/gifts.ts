import { ref, push, update, remove, onValue, get } from 'firebase/database';
import { db } from '../../lib/firebase';
import type { Gift } from '../../types';

const GIFTS_REF = 'gifts';

export async function addGift(gift: Omit<Gift, 'id'>): Promise<Gift> {
  try {
    const newGiftRef = push(ref(db, GIFTS_REF));
    const newGift = {
      ...gift,
      id: newGiftRef.key!,
      contributors: 0,
      status: 'available',
      remainingPrice: gift.totalPrice
    };
    
    await update(ref(db, `${GIFTS_REF}/${newGiftRef.key}`), newGift);
    return newGift;
  } catch (error) {
    console.error('Error adding gift:', error);
    throw error;
  }
}

export async function updateGift(giftId: string, updates: Partial<Gift>): Promise<void> {
  try {
    const giftRef = ref(db, `${GIFTS_REF}/${giftId}`);
    const snapshot = await get(giftRef);
    const currentGift = snapshot.val();

    if (!currentGift) {
      throw new Error('Gift not found');
    }

    const updatedGift = {
      ...currentGift,
      ...updates,
      // Preserve image if not provided
      image: updates.image || currentGift.image,
    };

    // Update remaining price if total price changes
    if (updates.totalPrice && !updates.remainingPrice) {
      const difference = updates.totalPrice - currentGift.totalPrice;
      updatedGift.remainingPrice = currentGift.remainingPrice + difference;
    }

    // Update status based on remaining price
    updatedGift.status = updatedGift.remainingPrice <= 0 ? 'received' : 
                        updatedGift.remainingPrice < updatedGift.totalPrice ? 'partial' : 
                        'available';

    await update(giftRef, updatedGift);
  } catch (error) {
    console.error('Error updating gift:', error);
    throw error;
  }
}

export async function updateGiftContributions(
  giftId: string, 
  contributedAmount: number,
  contributorsCount: number
): Promise<void> {
  try {
    const giftRef = ref(db, `${GIFTS_REF}/${giftId}`);
    const snapshot = await get(giftRef);
    const currentGift = snapshot.val();

    if (!currentGift) {
      throw new Error('Gift not found');
    }

    const remainingPrice = currentGift.totalPrice - contributedAmount;
    const updates = {
      remainingPrice,
      contributors: contributorsCount,
      status: remainingPrice <= 0 ? 'received' : 
              remainingPrice < currentGift.totalPrice ? 'partial' : 
              'available'
    };

    await update(giftRef, updates);
  } catch (error) {
    console.error('Error updating gift contributions:', error);
    throw error;
  }
}

export async function deleteGift(giftId: string): Promise<void> {
  try {
    await remove(ref(db, `${GIFTS_REF}/${giftId}`));
  } catch (error) {
    console.error('Error deleting gift:', error);
    throw error;
  }
}

export function subscribeToGifts(callback: (gifts: Gift[]) => void): () => void {
  const giftsRef = ref(db, GIFTS_REF);
  
  const unsubscribe = onValue(giftsRef, (snapshot) => {
    const gifts: Gift[] = [];
    snapshot.forEach((childSnapshot) => {
      gifts.push({
        id: childSnapshot.key!,
        ...childSnapshot.val()
      });
    });
    callback(gifts);
  });

  return unsubscribe;
}