import {AuthCredentials} from '@domain';

// import {User} from '@supabase/supabase-js';

export interface AuthCredentialsService {
  authCredentials: AuthCredentials | null;
  userId: string | null; ///CHANGED HERE FROM NUMBER TO STRING
  saveCredentials: (ac: AuthCredentials) => Promise<void>;
  removeCredentials: () => Promise<void>;
  // updateUser: (user: User) => void;
  isLoading: boolean;
}
