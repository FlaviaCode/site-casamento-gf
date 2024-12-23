import { GoogleSpreadsheet } from 'google-spreadsheet';
import type { RSVP } from '../types';

export async function addRSVPToSpreadsheet(rsvp: RSVP) {
  try {
    // For development/demo purposes when environment variables are not set
    if (!import.meta.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL || 
        !import.meta.env.VITE_GOOGLE_PRIVATE_KEY) {
      console.log('Demo mode: RSVP would be added to spreadsheet', rsvp);
      return true;
    }

    const doc = new GoogleSpreadsheet(import.meta.env.VITE_GOOGLE_SPREADSHEET_ID);
    
    // Replace escaped newlines in private key
    const privateKey = import.meta.env.VITE_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
    
    await doc.useServiceAccountAuth({
      client_email: import.meta.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    
    // Get the current row count to determine the next number
    const rows = await sheet.getRows();
    const nextNumber = rows.length + 1;

    // If this is the first entry, add headers
    if (rows.length === 0) {
      await sheet.setHeaderRow([
        'Número',
        'Nome Completo',
        'Confirmação',
        'Telefone',
        'Email',
        'Data de Confirmação'
      ]);
    }

    // Add the new row
    await sheet.addRow({
      'Número': nextNumber,
      'Nome Completo': rsvp.fullName,
      'Confirmação': rsvp.willAttend ? 'Sim' : 'Não',
      'Telefone': rsvp.phone,
      'Email': rsvp.email,
      'Data de Confirmação': new Date().toLocaleString('pt-BR')
    });

    return true;
  } catch (error) {
    console.error('Error adding to spreadsheet:', error);
    throw error; // Propagate error to handle it in the form
  }
}