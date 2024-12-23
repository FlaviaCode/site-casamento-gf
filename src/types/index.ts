export interface Gift {
  id: string;
  name: string;
  image: string;
  totalPrice: number;
  remainingPrice: number;
  contributors: number;
  status: 'available' | 'partial' | 'received';
}

export interface WeddingInfo {
  date: string;
  time: string;
  venue: string;
  address: string;
  dressCode: string;
  additionalInfo: string;
}

export interface RSVP {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  confirmed: boolean;
  timestamp: Date;
}

export interface Contribution {
  contributorName: string;
  amount: number;
  timestamp: string;
}