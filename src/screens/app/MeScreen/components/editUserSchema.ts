import {schemaTypes} from '@form';
import {z} from 'zod';

export const editUserSchema = z.object({
  username: z.string(),
  full_name: z.string(),
  dob: z.string(),
  // avatarUrl: z.string(),
  // gender: z.string(),
  height: schemaTypes.requiredPositiveNumber,
  weight: schemaTypes.requiredPositiveNumber,
  carbs_goal: schemaTypes.requiredPositiveNumber,
  fat_goal: schemaTypes.requiredPositiveNumber,
  cal_goal: schemaTypes.requiredPositiveNumber,
  protein_goal: schemaTypes.requiredPositiveNumber,
});

export type EditUserSchema = z.infer<typeof editUserSchema>;
