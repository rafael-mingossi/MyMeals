import {MMKVStorage} from '@services';
import {SupportedStorage} from '@supabase/supabase-js';

export const supabaseStorage: SupportedStorage | undefined = {
  getItem: (key: string) => {
    return MMKVStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    return MMKVStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    return MMKVStorage.removeItem(key);
  },
};
