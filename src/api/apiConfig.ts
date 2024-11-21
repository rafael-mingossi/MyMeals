import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // storage: MMKV,
    autoRefreshToken: false,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
