import {schemaTypes} from '@form';
import {z} from 'zod';

export const addRecipeSchema = z.object({
  name: z.string().min(1, 'Name is too short'),
  serving: schemaTypes.requiredPositiveNumber,
  servingUnit: z.string().min(1, 'Field required'),
});

export type AddRecipeSchema = z.infer<typeof addRecipeSchema>;
