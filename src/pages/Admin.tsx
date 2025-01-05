import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useStore } from '../store/useStore';
import { Gift } from '../types';
import { GiftForm } from '../components/admin/GiftForm';
import { GiftList } from '../components/admin/GiftList';
import { addGift, updateGift, updateGiftContributions, deleteGift, subscribeToGifts } from '../services/firebase/gifts';
import { exportRSVPs, exportGifts } from '../services/exports';
import toast from 'react-hot-toast';

export function Admin() {
  const navigate = useNavigate();
  const { gifts, isAdmin, setIsAdmin, setGifts } = useStore();
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
      return;
    }

    const unsubscribe = subscribeToGifts((updatedGifts) => {
      setGifts(updatedGifts);
    });

    return () => unsubscribe();
  }, [isAdmin, navigate, setGifts]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
      navigate('/login');
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao fazer logout');
    }
  };

  const handleAddGift = async (formData: FormData) => {
    try {
      const newGift = {
        name: formData.get('name') as string,
        image: formData.get('image') as string,
        totalPrice: Number(formData.get('price')),
        remainingPrice: Number(formData.get('price')),
        contributors: 0,
        status: 'available' as const
      };

      await addGift(newGift);
      setShowForm(false);
      toast.success('Presente adicionado com sucesso!');
    } catch (error) {
      console.error('Error adding gift:', error);
      toast.error('Erro ao adicionar presente');
    }
  };

  const handleUpdateGift = async (formData: FormData) => {
    if (!selectedGift) return;

    try {
      const updates = {
        name: formData.get('name') as string,
        image: formData.get('image') as string,
        totalPrice: Number(formData.get('price')),
      };

      await updateGift(selectedGift.id, updates);

      // Handle contribution updates separately
      const contributedAmount = Number(formData.get('contributedAmount'));
      const contributorsCount = Number(formData.get('contributors'));
      
      if (!isNaN(contributedAmount) && !isNaN(contributorsCount)) {
        await updateGiftContributions(selectedGift.id, contributedAmount, contributorsCount);
      }

      setSelectedGift(null);
      toast.success('Presente atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating gift:', error);
      toast.error('Erro ao atualizar presente');
    }
  };

  const handleDeleteGift = async (giftId: string) => {
    try {
      await deleteGift(giftId);
      toast.success('Presente removido com sucesso!');
    } catch (error) {
      toast.error('Erro ao remover presente');
    }
  };

  const handleExportRSVPs = async () => {
    try {
      await exportRSVPs();
      toast.success('Confirmações exportadas com sucesso!');
    } catch (error) {
      toast.error('Erro ao exportar confirmações');
    }
  };

  const handleExportGifts = () => {
    try {
      exportGifts(gifts);
      toast.success('Presentes exportados com sucesso!');
    } catch (error) {
      toast.error('Erro ao exportar presentes');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        <div className="flex gap-4">
          <button
            onClick={handleExportRSVPs}
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Exportar Confirmações
          </button>
          <button
            onClick={handleExportGifts}
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Exportar Presentes
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Sair
          </button>
        </div>
      </div>

      {showForm || selectedGift ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {selectedGift ? 'Editar Presente' : 'Adicionar Presente'}
          </h2>
          <GiftForm
            gift={selectedGift || undefined}
            onSubmit={selectedGift ? handleUpdateGift : handleAddGift}
            onCancel={() => {
              setSelectedGift(null);
              setShowForm(false);
            }}
          />
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mb-8 px-4 py-2 text-white bg-blue-400 rounded-lg hover:bg-blue-500"
        >
          Adicionar Presente
        </button>
      )}

      <GiftList
        gifts={gifts}
        onEdit={setSelectedGift}
        onDelete={handleDeleteGift}
      />
    </div>
  );
}