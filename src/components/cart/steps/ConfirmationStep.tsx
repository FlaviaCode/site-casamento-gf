export function ConfirmationStep({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center space-y-6">
      <h3 className="text-2xl font-semibold">Confirmação de pagamento</h3>
      <p className="text-gray-600">
        Obrigado por sua contribuição! Seu pagamento está sendo processado.
      </p>
      <button
        onClick={onClose}
        className="w-full bg-blue-400 text-white py-3 rounded-lg hover:bg-blue-500 transition-colors"
      >
        Retornar para a lista
      </button>
    </div>
  );
}