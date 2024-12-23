import { useEffect, useRef, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  variant?: 'info' | 'action';
}

export function AlertDialog({
  isOpen,
  onClose,
  title,
  message,
  confirmLabel = 'OK',
  cancelLabel = 'Cancelar',
  onConfirm,
  variant = 'info',
}: AlertDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus the confirm button when dialog opens
      confirmButtonRef.current?.focus();
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      // Create focus trap
      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const focusableElements = dialogRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) || [];
          
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleEscape as any);
      dialogRef.current?.addEventListener('keydown', handleTab as any);

      return () => {
        window.removeEventListener('keydown', handleEscape as any);
        dialogRef.current?.removeEventListener('keydown', handleTab as any);
        document.body.style.overflow = 'unset';
        // Restore focus to the previously focused element
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fadeIn"
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all animate-slideIn"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 
            id="dialog-title"
            className="text-lg font-semibold text-gray-900"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded-full p-1"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-gray-600">{message}</p>
        </div>

        <div className={cn(
          "p-4 flex gap-3",
          variant === 'action' ? 'justify-end' : 'justify-center',
          "border-t border-gray-100"
        )}>
          {variant === 'action' && (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all"
            >
              {cancelLabel}
            </button>
          )}
          <button
            ref={confirmButtonRef}
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            className={cn(
              "px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all",
              variant === 'action'
                ? "bg-blue-400 hover:bg-blue-500 focus:ring-blue-400"
                : "bg-blue-400 hover:bg-blue-500 focus:ring-blue-400"
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}