import { Gift } from '../../types';
import { formatCurrency } from '../../lib/utils';

interface GiftListProps {
  gifts: Gift[];
  onEdit: (gift: Gift) => void;
  onDelete: (giftId: string) => void;
}

export function GiftList({ gifts, onEdit, onDelete }: GiftListProps) {
  return (
    <div className="space-y-4">
      {gifts.map((gift) => (
        <div
          key={gift.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
        >
          <div className="flex items-center space-x-4">
            <img
              src={gift.image}
              alt={gift.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 className="font-medium">{gift.name}</h3>
              <p className="text-sm text-gray-500">
                {formatCurrency(gift.totalPrice)} • {gift.contributors} contribuições
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(gift)}
              className="px-3 py-1 text-blue-400 hover:bg-blue-50 rounded"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(gift.id)}
              className="px-3 py-1 text-red-400 hover:bg-red-50 rounded"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}