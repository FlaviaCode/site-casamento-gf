import * as XLSX from 'xlsx';
import { getRSVPs } from './firebase';
import { Gift } from '../types';

export async function exportRSVPs() {
  const rsvps = await getRSVPs();
  
  const data = rsvps.map(rsvp => ({
    'Nome Completo': rsvp.fullName,
    'Email': rsvp.email,
    'Telefone': rsvp.phone,
    'Confirmado': rsvp.confirmed ? 'Sim' : 'Não',
    'Data': new Date(rsvp.timestamp).toLocaleString('pt-BR')
  }));

  exportToExcel(data, 'confirmacoes.xlsx');
}

export function exportGifts(gifts: Gift[]) {
  const data = gifts.map(gift => ({
    'Nome': gift.name,
    'Preço Total': gift.totalPrice,
    'Valor Restante': gift.remainingPrice,
    'Contribuidores': gift.contributors,
    'Status': gift.status
  }));

  exportToExcel(data, 'presentes.xlsx');
}

function exportToExcel(data: any[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, filename);
}