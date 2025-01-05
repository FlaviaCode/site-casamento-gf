import { useState, useRef } from 'react';
import { Gift } from '../../types';
import { FormField } from '../FormField';
import { formatCurrencyInput } from '../../lib/utils';
import { uploadImage } from '../../services/firebase/storage';
import toast from 'react-hot-toast';

interface GiftFormProps {
  gift?: Gift;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel?: () => void;
}

export function GiftForm({ gift, onSubmit, onCancel }: GiftFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priceValue, setPriceValue] = useState(gift?.totalPrice ? formatCurrencyInput(gift.totalPrice) : '');
  const [contributedValue, setContributedValue] = useState(
    gift ? formatCurrencyInput(gift.totalPrice - gift.remainingPrice) : ''
  );
  const [contributorsCount, setContributorsCount] = useState(gift?.contributors?.toString() || '0');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [previewImage, setPreviewImage] = useState<string>(gift?.image || '');

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = formatCurrencyInput(Number(value) / 100);
    setPriceValue(formattedValue);
  };

  const handleContributedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = formatCurrencyInput(Number(value) / 100);
    setContributedValue(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const imageFile = fileInputRef.current?.files?.[0];

      // Handle image
      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        formData.set('image', imageUrl);
      } else if (gift?.image) {
        formData.set('image', gift.image);
      }

      // Handle prices
      const totalPrice = Number(priceValue.replace(/\D/g, '')) / 100;
      const contributedAmount = Number(contributedValue.replace(/\D/g, '')) / 100;
      
      formData.set('price', totalPrice.toString());
      formData.set('contributedAmount', contributedAmount.toString());
      formData.set('contributors', contributorsCount);

      await onSubmit(formData);
      if (!gift) {
        formRef.current?.reset();
        setPriceValue('');
        setContributedValue('');
        setContributorsCount('0');
        setPreviewImage('');
      }
    } catch (error) {
      console.error('Error submitting gift:', error);
      toast.error('Erro ao salvar presente');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <FormField
        name="name"
        label="Nome do Presente"
        defaultValue={gift?.name}
        required
      />
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Imagem do Presente
        </label>
        <input
          ref={fileInputRef}
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover rounded-lg"
          />
        )}
      </div>
      
      <FormField
        name="price"
        label="Preço Total"
        value={priceValue}
        onChange={handlePriceChange}
        required
      />

      {gift && (
        <>
          <FormField
            name="contributedAmount"
            label="Valor já Contribuído"
            value={contributedValue}
            onChange={handleContributedChange}
          />

          <FormField
            name="contributors"
            label="Número de Contribuidores"
            type="number"
            min="0"
            value={contributorsCount}
            onChange={(e) => setContributorsCount(e.target.value)}
          />
        </>
      )}

      <div className="flex gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 text-white bg-blue-400 rounded-lg hover:bg-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : gift ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
}