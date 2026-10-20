export { validators } from "../utilities/validators";

export interface ValidationRule<T> {
  field: keyof T;
  validate: (val: any, allValues: T) => string | null;
}

export function createSchemaValidator<T extends Record<string, any>>(
  rules: ValidationRule<T>[]
) {
  return (values: T): Partial<Record<keyof T, string>> => {
    const errors: Partial<Record<keyof T, string>> = {};

    for (const rule of rules) {
      if (errors[rule.field]) continue; // stop at first error for field
      const error = rule.validate(values[rule.field], values);
      if (error) {
        errors[rule.field] = error;
      }
    }

    return errors;
  };
}
