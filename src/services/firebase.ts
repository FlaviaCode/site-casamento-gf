import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { RSVP, Gift } from '../types';

// RSVP Functions
export async function addRSVP(rsvp: Omit<RSVP, 'id'>) {
  try {
    const rsvpsRef = collection(db, 'rsvps');
    const docRef = await addDoc(rsvpsRef, {
      ...rsvp,
      timestamp: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding RSVP:', error);
    throw error;
  }
}

export async function getRSVPs() {
  const rsvpsRef = collection(db, 'rsvps');
  const snapshot = await getDocs(rsvpsRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as RSVP[];
}

// Gift Functions
export async function updateGift(giftId: string, updates: Partial<Gift>) {
  const giftRef = doc(db, 'gifts', giftId);
  await updateDoc(giftRef, updates);
}

export async function processGiftContribution(
  giftId: string,
  amount: number,
  contributorName: string
) {
  const giftRef = doc(db, `gifts/${giftId}`);
  const gift = await getDocs(collection(db, 'gifts'));
  const giftData = gift.docs.find(doc => doc.id === giftId);
  
  if (!giftData) throw new Error('Gift not found');
  
  const giftInfo = { id: giftId, ...giftData.data() } as Gift;

  const newRemainingPrice = giftInfo.remainingPrice - amount;
  const newContributors = giftInfo.contributors + 1;
  const newStatus = newRemainingPrice <= 0 ? 'received' : 'partial';

  await updateDoc(giftRef, {
    remainingPrice: newRemainingPrice,
    contributors: newContributors,
    status: newStatus,
  });

  // Record the contribution
  const contributionRef = collection(db, 'contributions');
  await addDoc(contributionRef, {
    giftId,
    contributorName,
    amount,
    timestamp: new Date().toISOString(),
  });
}