import { ref, push, get, query, orderByKey, update } from 'firebase/database';
import { db } from '../../lib/firebase';
import type { RSVP } from '../../types';

const RSVP_REF = 'rsvps';

export async function addRSVP(rsvp: Omit<RSVP, 'id'>): Promise<RSVP> {
  try {
    const newRsvpRef = push(ref(db, RSVP_REF));
    const newRsvp = {
      ...rsvp,
      id: newRsvpRef.key!,
      timestamp: new Date().toISOString()
    };
    
    await update(ref(db, `${RSVP_REF}/${newRsvpRef.key}`), newRsvp);
    return newRsvp;
  } catch (error) {
    console.error('Error adding RSVP:', error);
    throw error;
  }
}

export async function getRSVPs(): Promise<RSVP[]> {
  try {
    const rsvpsRef = ref(db, RSVP_REF);
    const rsvpsQuery = query(rsvpsRef, orderByKey());
    const snapshot = await get(rsvpsQuery);
    
    const rsvps: RSVP[] = [];
    snapshot.forEach((childSnapshot) => {
      rsvps.push({
        id: childSnapshot.key!,
        ...childSnapshot.val()
      });
    });
    
    return rsvps;
  } catch (error) {
    console.error('Error getting RSVPs:', error);
    throw error;
  }
}