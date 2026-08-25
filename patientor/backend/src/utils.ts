import { Gender, type Gender as GenderType, type NewPatient } from './types.ts';

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const isGender = (param: string): param is GenderType => {
  return (Object.values(Gender) as string[]).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseGender = (gender: unknown): GenderType => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth');
  }

  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
    ) {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default parseNewPatient;