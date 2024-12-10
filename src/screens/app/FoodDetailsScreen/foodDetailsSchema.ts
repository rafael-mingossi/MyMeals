import {z} from 'zod';

const requiredPositiveNumber = z.preprocess(
  val => (val === '' ? undefined : Number(val)),
  z
    .number({
      invalid_type_error: 'Expected a number',
      required_error: 'Field is required',
    })
    .min(1, 'Must be greater than 0'),
);

export const foodDetailsSchema = z.object({
  quantity: requiredPositiveNumber,
});

export type FoodDetailsSchema = z.infer<typeof foodDetailsSchema>;
