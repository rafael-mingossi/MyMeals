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

const optionalNumber = z.preprocess(
  val => (val === '' ? undefined : Number(val)),
  z
    .number({
      invalid_type_error: 'Expected a number',
    })
    .min(0, 'Cannot be negative')
    .optional(),
);

export const addFoodSchema = z.object({
  label: z.string().min(1, 'Name is too short'),
  protein: requiredPositiveNumber,
  carbs: requiredPositiveNumber,
  fat: requiredPositiveNumber,
  calories: requiredPositiveNumber,
  fibre: optionalNumber,
  sodium: optionalNumber,
  serv_size: requiredPositiveNumber,
  serv_unit: z.string().min(1, 'Field required'),
  category_id: z.preprocess(
    val => Number(val),
    z.number({invalid_type_error: 'Expected a number'}).int(),
  ),
});

export type AddFoodSchema = z.infer<typeof addFoodSchema>;
