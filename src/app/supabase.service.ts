import { Injectable } from '@angular/core';
import { supabase } from '../clients/supabase.config';
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  constructor() { }
  async getAllData(table: string) {
    const { data, error } = await supabase.from(table).select('*');
    if (error) {
      throw error;
    }
    return data;
  }
}
