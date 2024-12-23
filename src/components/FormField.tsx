import { forwardRef } from 'react';
import { cn } from '../lib/utils';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            "peer w-full p-4 border-2 rounded-lg outline-none transition-colors bg-white",
            error ? "border-red-500" : "border-blue-200 focus:border-blue-400",
            className
          )}
          placeholder=" "
          {...props}
        />
        <label className="absolute left-1/2 -translate-x-1/2 -top-6 text-base text-gray-900 transition-all pointer-events-none peer-focus:-top-6 peer-focus:text-gray-900 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500">
          {label}
        </label>
        {error && (
          <span className="text-red-500 text-sm mt-1 block">{error}</span>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';