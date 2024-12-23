interface PresentButtonProps {
  onClick: () => void;
}

export function PresentButton({ onClick }: PresentButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-400 text-white py-3 rounded-xl hover:bg-blue-500 transition-colors relative overflow-hidden group"
    >
      Presentear
    </button>
  );
}