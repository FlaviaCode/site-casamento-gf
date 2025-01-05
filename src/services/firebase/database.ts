import { ref, get, set, update, remove, query, orderByKey } from 'firebase/database';
import { db } from '../../lib/firebase';

export class DatabaseService {
  private static handleError(error: any, operation: string): never {
    console.error(`Database operation failed (${operation}):`, error);
    throw error;
  }

  static async get<T>(path: string, id: string): Promise<T | null> {
    try {
      const snapshot = await get(ref(db, `${path}/${id}`));
      return snapshot.exists() ? { id, ...snapshot.val() } as T : null;
    } catch (error) {
      this.handleError(error, 'get');
    }
  }

  static async getAll<T>(path: string): Promise<T[]> {
    try {
      const snapshot = await get(query(ref(db, path), orderByKey()));
      const items: T[] = [];
      
      snapshot.forEach((childSnapshot) => {
        items.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        } as T);
      });
      
      return items;
    } catch (error) {
      this.handleError(error, 'getAll');
    }
  }

  static async create<T extends { id?: string }>(path: string, data: T): Promise<T> {
    try {
      const newRef = ref(db, `${path}/${data.id || crypto.randomUUID()}`);
      const timestamp = new Date().toISOString();
      
      const itemData = {
        ...data,
        createdAt: timestamp,
        updatedAt: timestamp
      };
      
      await set(newRef, itemData);
      
      return {
        ...itemData,
        id: newRef.key
      } as T;
    } catch (error) {
      this.handleError(error, 'create');
    }
  }

  static async update<T>(path: string, id: string, data: Partial<T>): Promise<void> {
    try {
      const updates = {
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      await update(ref(db, `${path}/${id}`), updates);
    } catch (error) {
      this.handleError(error, 'update');
    }
  }

  static async delete(path: string, id: string): Promise<void> {
    try {
      await remove(ref(db, `${path}/${id}`));
    } catch (error) {
      this.handleError(error, 'delete');
    }
  }
}