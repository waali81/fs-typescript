import {
  NewPatientSchema,
  EntrySchema,
  type NewPatient,
  type EntryWithoutId,
} from './types.ts';

const parseNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export const parseNewEntry = (object: unknown): EntryWithoutId => {
  return EntrySchema.parse(object);
};

export default parseNewPatient;