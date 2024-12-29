import {schemaTypes} from '@form';
import {z} from 'zod';


export const addFoodSchema = z.object({
  label: z.string().min(1, 'Name is too short'),
  protein: schemaTypes.requiredPositiveNumber,
  carbs: schemaTypes.requiredPositiveNumber,
  fat: schemaTypes.requiredPositiveNumber,
  calories: schemaTypes.requiredPositiveNumber,
  fibre: schemaTypes.optionalNumber,
  sodium: schemaTypes.optionalNumber,
  serv_size: schemaTypes.requiredPositiveNumber,
  serv_unit: z.string().min(1, 'Field required'),
  category_id: z.preprocess(
    val => (val === undefined ? 1 : Number(val)),
    z.number({invalid_type_error: 'Expected a number'}).int(),
  ),
});

export type AddFoodSchema = z.infer<typeof addFoodSchema>;
