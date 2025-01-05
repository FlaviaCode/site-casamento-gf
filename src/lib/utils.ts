import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatCurrencyInput(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

export function generatePixCode(value: number, key: string): string {
  return `00020126580014br.gov.bcb.pix0136${key}5204000053039865802BR5913Wedding Gift6009Sao Paulo62070503***63046123`;
}

export function formatPhone(phone: string): string {
  return phone.replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2');
}