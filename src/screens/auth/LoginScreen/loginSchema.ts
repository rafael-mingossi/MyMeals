import {z} from 'zod';

export const loginSchema = z.object({
  email: z.string().email('invalid e-mail format'),
  password: z.string().min(1, 'password is too short'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
