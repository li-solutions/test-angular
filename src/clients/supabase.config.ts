import { createClient } from '@supabase/supabase-js';
import {environment} from '../environments/environment.development';

const SUPABASE_URL = environment.supabaseURL;
const SUPABASE_KEY = environment.supabaseKey;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
