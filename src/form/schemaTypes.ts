import {z} from 'zod';

const numberFromString = (val: unknown) => {
  if (typeof val === 'number') {
    return val;
  }
  if (val === '' || val === undefined) {
    return undefined;
  }
  const parsed = Number(val);
  return isNaN(parsed) ? undefined : parsed;
};

const requiredPositiveNumber = z.preprocess(
  numberFromString,
  z
    .number({
      invalid_type_error: 'Expected a number',
      required_error: 'Field is required',
    })
    .min(0.0000001, 'Must be greater than 0'),
);

const optionalNumber = z.preprocess(
  numberFromString,
  z
    .number({
      invalid_type_error: 'Expected a number',
    })
    .min(0, 'Cannot be negative')
    .optional(),
);

export const schemaTypes = {requiredPositiveNumber, optionalNumber};
