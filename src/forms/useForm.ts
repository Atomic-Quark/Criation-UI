import React, { useState, useCallback, useMemo, useRef } from "react";

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type FormTouched<T> = Partial<Record<keyof T, boolean>>;
export type FormValidator<T> = (values: T) => FormErrors<T> | Promise<FormErrors<T>>;

export interface UseFormOptions<T extends Record<string, any>> {
  initialValues: T;
  validate?: FormValidator<T>;
  onSubmit?: (values: T) => Promise<void> | void;
}

export interface UseFormReturn<T extends Record<string, any>> {
  values: T;
  errors: FormErrors<T>;
  touched: FormTouched<T>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setFieldError: (field: keyof T, error: string | undefined) => void;
  setFieldTouched: (field: keyof T, isTouched?: boolean) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<boolean>;
  reset: (newInitialValues?: T) => void;
  register: (field: keyof T) => {
    name: string;
    value: any;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | any
    ) => void;
    onBlur: (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | any
    ) => void;
    error?: string;
  };
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const initialValuesRef = useRef<T>(initialValues);
  const validationSeqRef = useRef<number>(0);
  const isMountedRef = useRef<boolean>(true);
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<FormTouched<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const runValidation = useCallback(
    async (currentValues: T): Promise<FormErrors<T>> => {
      if (!validate) return {};
      const seq = ++validationSeqRef.current;
      try {
        const result = await validate(currentValues);
        if (seq !== validationSeqRef.current) {
          // Discard stale async validation result
          return {};
        }
        return result || {};
      } catch {
        return {};
      }
    },
    [validate]
  );

  const setFieldValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((prev) => {
        const next = { ...prev, [field]: value };
        if (validate) {
          const seq = ++validationSeqRef.current;
          Promise.resolve(validate(next)).then((errs) => {
            if (seq === validationSeqRef.current) {
              setErrors(errs || {});
            }
          }).catch(() => {});
        }
        return next;
      });
    },
    [validate]
  );

  const setFieldError = useCallback((field: keyof T, error: string | undefined) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }
      return next;
    });
  }, []);

  const setFieldTouched = useCallback((field: keyof T, isTouched: boolean = true) => {
    setTouched((prev) => ({ ...prev, [field]: isTouched }));
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const target = e.target;
      const name = target.name as keyof T;
      if (!name) return;

      let value: any = target.value;
      if (target instanceof HTMLInputElement) {
        if (target.type === "checkbox") {
          value = target.checked;
        } else if (target.type === "number") {
          value = target.value === "" ? "" : Number(target.value);
        }
      }

      setFieldValue(name, value);
    },
    [setFieldValue]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const name = e.target.name as keyof T;
      if (!name) return;
      setFieldTouched(name, true);
    },
    [setFieldTouched]
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent): Promise<boolean> => {
      if (e && typeof e.preventDefault === "function") {
        e.preventDefault();
      }

      // Mark all fields as touched
      const allTouched: FormTouched<T> = {};
      (Object.keys(values) as (keyof T)[]).forEach((key) => {
        allTouched[key] = true;
      });
      setTouched(allTouched);

      const validationErrors = await runValidation(values);
      setErrors(validationErrors);

      const hasErrors = Object.keys(validationErrors).length > 0;
      if (hasErrors) {
        return false;
      }

      if (onSubmit) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
          if (isMountedRef.current) {
            return true;
          }
          return true;
        } catch (submissionErr: any) {
          if (isMountedRef.current) {
            setErrors((prev) => ({
              ...prev,
              _form: submissionErr?.message || "Form submission failed",
            } as any));
          }
          return false;
        } finally {
          if (isMountedRef.current) {
            setIsSubmitting(false);
          }
        }
      }

      return true;
    },
    [values, runValidation, onSubmit]
  );

  const reset = useCallback((newInitialValues?: T) => {
    const nextInit = newInitialValues || initialValuesRef.current;
    if (newInitialValues) {
      initialValuesRef.current = newInitialValues;
    }
    validationSeqRef.current++;
    setValues(nextInit);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, []);

  const register = useCallback(
    (field: keyof T) => {
      return {
        name: String(field),
        value: values[field] ?? "",
        onChange: (e: any) => {
          if (e && e.target) {
            handleChange(e);
          } else {
            setFieldValue(field, e);
          }
        },
        onBlur: (e: any) => {
          if (e && e.target) {
            handleBlur(e);
          } else {
            setFieldTouched(field, true);
          }
        },
        error: touched[field] ? errors[field] : undefined,
      };
    },
    [values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldTouched]
  );

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValuesRef.current);
  }, [values]);

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    setValues,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    register,
  };
}
