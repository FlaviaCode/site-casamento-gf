import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Gift } from '../../types';

export async function addGift(gift: Omit<Gift, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, 'gifts'), gift);
    return docRef;
  } catch (error) {
    console.error('Error adding gift:', error);
    throw error;
  }
}

export async function updateGift(giftId: string, updates: Partial<Gift>) {
  try {
    await updateDoc(doc(db, 'gifts', giftId), updates);
  } catch (error) {
    console.error('Error updating gift:', error);
    throw error;
  }
}

export async function deleteGift(giftId: string) {
  try {
    await deleteDoc(doc(db, 'gifts', giftId));
  } catch (error) {
    console.error('Error deleting gift:', error);
    throw error;
  }
}

export async function getGifts() {
  try {
    const querySnapshot = await getDocs(collection(db, 'gifts'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Gift[];
  } catch (error) {
    console.error('Error getting gifts:', error);
    throw error;
  }
}