import {User, Session} from '@supabase/supabase-js';

export interface AuthCredentials {
  session: Session;
  user: User;
}

export interface SignUpData {
  email: string;
  password: string;
  username: string;
  full_name: string;
}

export interface SignInData {
  email: string;
  password: string;
}
