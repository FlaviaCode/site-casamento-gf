import { useState } from 'react';
import { FormField } from '../../FormField';
import { formatCurrency } from '../../../lib/utils';

interface PaymentFormStepProps {
  method: 'pix' | 'credit';
  amount: number;
  onSubmit: () => void;
}

export function PaymentFormStep({ method, amount, onSubmit }: PaymentFormStepProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl text-center mb-8">
        {method === 'pix' ? 'Pagar com PIX' : 'Pagar com Cartão de Crédito'}
      </h3>

      <div className="text-center mb-8">
        <p className="text-sm text-gray-500">Valor total</p>
        <p className="text-2xl font-semibold text-gray-900">{formatCurrency(amount)}</p>
      </div>

      <FormField
        label="Nome completo"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        required
      />

      <FormField
        type="email"
        label="E-mail"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <FormField
        label="CPF"
        value={formData.cpf}
        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
        required
      />

      <FormField
        label="Telefone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-400 text-white py-3 rounded-lg hover:bg-blue-500 transition-colors"
      >
        Continuar
      </button>
    </form>
  );
}