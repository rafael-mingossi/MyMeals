import {z} from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('invalid e-mail format'),
  password: z.string().min(1, 'password is too short'),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
