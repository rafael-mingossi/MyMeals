import {User, Session} from '@supabase/supabase-js';

export interface AuthCredentials {
  session: Session; // Replace 'any' with your Supabase session type
  user: User; // Replace 'any' with your Supabase user type
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
