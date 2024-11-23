import 'react-native-url-polyfill/auto';
import {SUPABASE_URL, SUPABASE_ANON_KEY} from '@env';
import {createClient} from '@supabase/supabase-js';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables:', {
    SUPABASE_URL: !!SUPABASE_URL,
    SUPABASE_ANON_KEY: !!SUPABASE_ANON_KEY,
  });
  throw new Error('Missing Supabase environment variables');
}

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Testing ENVs
// console.log('Supabase URL:', SUPABASE_URL?.slice(0, 10) + '...');
