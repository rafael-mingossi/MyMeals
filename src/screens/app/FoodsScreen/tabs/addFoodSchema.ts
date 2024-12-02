import {z} from 'zod';

const setAsNumber = z.string().refine(val => !Number.isNaN(parseInt(val, 10)), {
  message: 'Expected number',
});

export const addFoodSchema = z.object({
  label: z.string().min(1, 'Name is too short'),
  protein: setAsNumber,
  carbs: setAsNumber,
  fat: setAsNumber,
  calories: setAsNumber,
  fibre: setAsNumber,
  sodium: setAsNumber,
  serv_size: setAsNumber,
  serv_unit: z.string().min(1, 'Field required'),
  category_id: setAsNumber,
});

export type AddFoodSchema = z.infer<typeof addFoodSchema>;
