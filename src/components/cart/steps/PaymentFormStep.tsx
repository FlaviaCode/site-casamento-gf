import { useState } from 'react';
import { FormField } from '../../FormField';
import { formatCurrency, formatCPF, formatPhone } from '../../../lib/utils';

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
    installments: '1'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const installmentOptions = Array.from({ length: 12 }, (_, i) => {
    const installmentAmount = amount / (i + 1);
    return {
      value: String(i + 1),
      label: `${i + 1}x de ${formatCurrency(installmentAmount)}${i === 0 ? ' à vista' : ''}`
    };
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-xl text-center mb-8 font-bold text-blue-400">
        {method === 'pix' 
          ? 'Insira os seus dados para a emissão do QR Code para pagamentos'
          : 'Pagar com Cartão de Crédito'}
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
        onChange={(e) => {
          const formatted = formatCPF(e.target.value);
          setFormData({ ...formData, cpf: formatted });
        }}
        required
      />

      <FormField
        label="Telefone"
        value={formData.phone}
        onChange={(e) => {
          const formatted = formatPhone(e.target.value);
          setFormData({ ...formData, phone: formatted });
        }}
        required
      />

      {method === 'credit' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Método de parcelamento
          </label>
          <select
            value={formData.installments}
            onChange={(e) => setFormData({ ...formData, installments: e.target.value })}
            className="w-full p-4 border-2 rounded-lg border-blue-200 focus:border-blue-400 outline-none transition-colors"
            required
          >
            {installmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-400 text-white py-3 rounded-lg hover:bg-blue-500 transition-colors"
      >
        Continuar
      </button>
    </form>
  );
}