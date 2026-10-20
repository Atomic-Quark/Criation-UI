import React, { createContext, useContext, useState, type ReactNode } from "react";

export type FormValues = Record<string, any>;
export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type ValidatorFn<T> = (values: T) => FormErrors<T>;

export interface FormContextValue<T extends FormValues = FormValues> {
  values: T;
  errors: FormErrors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  setValue: (field: keyof T, value: any) => void;
  setTouched: (field: keyof T) => void;
  setError: (field: keyof T, error: string) => void;
  handleSubmit: (e?: React.FormEvent) => void;
  isSubmitting: boolean;
  isValid: boolean;
}

const FormContext = createContext<FormContextValue<any> | undefined>(undefined);

export interface FormProviderProps<T extends FormValues> {
  initialValues: T;
  validate?: ValidatorFn<T>;
  onSubmit: (values: T) => Promise<void> | void;
  children: ReactNode;
}

export function FormProvider<T extends FormValues>({
  initialValues,
  validate,
  onSubmit,
  children,
}: FormProviderProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = (field: keyof T, value: any) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      if (validate) {
        setErrors(validate(next));
      }
      return next;
    });
  };

  const setTouched = (field: keyof T) => {
    setTouchedState((prev) => ({ ...prev, [field]: true }));
  };

  const setError = (field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = Object.keys(errors).length === 0;

  const contextValue: FormContextValue<T> = {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    setError,
    handleSubmit,
    isSubmitting,
    isValid,
  };

  return (
    <FormContext.Provider value={contextValue as any}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext<T extends FormValues = FormValues>(): FormContextValue<T> {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a <FormProvider />");
  }
  return context;
}
