import * as XLSX from 'xlsx';
import { getRSVPs } from './firebase/rsvp';
import { Gift } from '../types';

export async function exportRSVPs() {
  try {
    const rsvps = await getRSVPs();
    
    if (!rsvps || rsvps.length === 0) {
      throw new Error('No RSVPs found to export');
    }
    
    const data = rsvps.map(rsvp => ({
      'Nome Completo': rsvp.fullName,
      'Email': rsvp.email,
      'Telefone': rsvp.phone,
      'Confirmado': rsvp.confirmed ? 'Sim' : 'Não',
      'Data': new Date(rsvp.timestamp).toLocaleString('pt-BR')
    }));

    exportToExcel(data, 'confirmacoes.xlsx');
  } catch (error) {
    console.error('Error exporting RSVPs:', error);
    throw error;
  }
}

export function exportGifts(gifts: Gift[]) {
  try {
    if (!gifts || gifts.length === 0) {
      throw new Error('No gifts found to export');
    }

    const data = gifts.map(gift => ({
      'Nome': gift.name,
      'Preço Total': gift.totalPrice,
      'Valor Restante': gift.remainingPrice,
      'Contribuidores': gift.contributors,
      'Status': gift.status
    }));

    exportToExcel(data, 'presentes.xlsx');
  } catch (error) {
    console.error('Error exporting gifts:', error);
    throw error;
  }
}

function exportToExcel(data: any[], filename: string) {
  if (!data || data.length === 0) {
    throw new Error('No data to export');
  }

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, filename);
}