import type { Gift, WeddingInfo } from '../types';

export const demoWeddingInfo: WeddingInfo = {
  date: '14 de Junho de 2025',
  time: '16:00',
  venue: 'Portal Ecomangue',
  address: 'R. Valdir Bezerra, 110 - Sabiaguaba, Fortaleza - CE, 60835-795',
  dressCode: 'Traje Social Completo',
  additionalInfo: 'Celebraremos este momento especial com muito amor e alegria. Sua presença é fundamental para tornar este dia ainda mais especial.'
};

export const demoGifts: Gift[] = [
  {
    id: '1',
    name: 'Jogo de Panelas Tramontina',
    image: 'https://images.unsplash.com/photo-1593759608142-e9b18c0dbe86?ixlib=rb-1.2.1',
    totalPrice: 1200,
    remainingPrice: 800,
    contributors: 2,
    status: 'partial'
  },
  {
    id: '2',
    name: 'Geladeira Frost Free',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1',
    totalPrice: 3500,
    remainingPrice: 3500,
    contributors: 0,
    status: 'available'
  },
  {
    id: '3',
    name: 'Sofá Retrátil',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1',
    totalPrice: 2800,
    remainingPrice: 0,
    contributors: 1,
    status: 'received'
  },
  {
    id: '4',
    name: 'Smart TV 55"',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1',
    totalPrice: 3200,
    remainingPrice: 1600,
    contributors: 3,
    status: 'partial'
  },
  {
    id: '5',
    name: 'Máquina de Lavar',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-1.2.1',
    totalPrice: 2500,
    remainingPrice: 2500,
    contributors: 0,
    status: 'available'
  },
  {
    id: '6',
    name: 'Jogo de Cama King',
    image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?ixlib=rb-1.2.1',
    totalPrice: 800,
    remainingPrice: 400,
    contributors: 2,
    status: 'partial'
  },
  {
    id: '7',
    name: 'Ar Condicionado Split',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?ixlib=rb-1.2.1',
    totalPrice: 2200,
    remainingPrice: 2200,
    contributors: 0,
    status: 'available'
  }
];