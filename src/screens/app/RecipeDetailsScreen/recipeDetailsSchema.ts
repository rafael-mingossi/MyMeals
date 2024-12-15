import {z} from 'zod';

const requiredPositiveNumber = z.preprocess(
  val => (val === '' ? undefined : Number(val)),
  z
    .number({
      invalid_type_error: 'Expected a number',
      required_error: 'Field is required',
    })
    .min(0.1, 'Must be greater than 0'),
);

export const recipeDetailsSchema = z.object({
  quantity: requiredPositiveNumber,
});

export type RecipeDetailsSchema = z.infer<typeof recipeDetailsSchema>;
