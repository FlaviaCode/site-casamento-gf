import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useStore } from '../store/useStore';
import { Gift, WeddingInfo } from '../types';
import toast from 'react-hot-toast';

export function AdminPanel() {
  const { weddingInfo, gifts, setWeddingInfo, setGifts } = useStore();
  const [editingGift, setEditingGift] = useState<Gift | null>(null);

  const handleUpdateWeddingInfo = async (newInfo: Partial<WeddingInfo>) => {
    try {
      await updateDoc(doc(db, 'weddingInfo', 'main'), newInfo);
      setWeddingInfo({ ...weddingInfo, ...newInfo });
      toast.success('Informações atualizadas com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar informações.');
    }
  };

  const handleUpdateGift = async (giftId: string, updates: Partial<Gift>) => {
    try {
      await updateDoc(doc(db, 'gifts', giftId), updates);
      setGifts(gifts.map(gift => 
        gift.id === giftId ? { ...gift, ...updates } : gift
      ));
      toast.success('Presente atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar presente.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Painel Administrativo</h2>
      
      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Informações do Casamento</h3>
          <div className="space-y-4">
            {Object.entries(weddingInfo).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700">
                  {key}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleUpdateWeddingInfo({ [key]: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Lista de Presentes</h3>
          <div className="space-y-4">
            {gifts.map((gift) => (
              <div key={gift.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{gift.name}</h4>
                  <button
                    onClick={() => setEditingGift(gift)}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}