import {z} from 'zod';

const requiredPositiveNumber = z.preprocess(
  val => (val === '' ? undefined : Number(val)),
  z
    .number({
      invalid_type_error: 'Expected a number',
      required_error: 'Field is required',
    })
    .min(0.0000001, 'Must be greater than 0'),
);

export const addRecipeSchema = z.object({
  label: z.string().min(1, 'Name is too short'),
  serv_size: requiredPositiveNumber,
  serv_unit: z.string().min(1, 'Field required'),
});

export type AddRecipeSchema = z.infer<typeof addRecipeSchema>;
