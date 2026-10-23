import React, { useState } from "react";
import type { FieldDefinition } from "./model";
import { BaseInput } from "../components/inputs/Input";
import { Select, type SelectOption } from "../components/inputs/Select";
import { TextArea } from "../components/inputs/TextArea";
import { BaseButton } from "../components/buttons/Button";
import { BaseStack } from "../components/layout/Stack";

export interface SchemaFormProps {
  fields: FieldDefinition[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  className?: string;
}

export function validateFieldValue(field: FieldDefinition, value: any): string | null {
  const v = field.validation;
  const isPresent = value !== undefined && value !== null && String(value).trim() !== "";

  if (v?.required && !isPresent) {
    return v.customMessage || `${field.label || field.name} is required.`;
  }

  if (isPresent) {
    if (field.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(value).trim())) {
        return v?.customMessage || "Please enter a valid email address.";
      }
    }

    if (field.type === "number") {
      const num = Number(value);
      if (isNaN(num)) {
        return "Must be a valid number.";
      }
      if (v?.min !== undefined && num < v.min) {
        return `Must be at least ${v.min}.`;
      }
      if (v?.max !== undefined && num > v.max) {
        return `Must be at most ${v.max}.`;
      }
    }

    if (typeof value === "string") {
      if (v?.minLength !== undefined && value.length < v.minLength) {
        return `Must be at least ${v.minLength} characters.`;
      }
      if (v?.maxLength !== undefined && value.length > v.maxLength) {
        return `Must be at most ${v.maxLength} characters.`;
      }
    }
  }

  return null;
}

/**
 * SchemaForm:
 * Declaratively generates an accessible, validated form directly from FieldDefinition[]
 */
export function SchemaForm({
  fields,
  initialValues = {},
  onSubmit,
  onCancel,
  submitLabel = "Save Changes",
  cancelLabel = "Cancel",
  isSubmitting = false,
  className = "",
}: SchemaFormProps) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    for (const f of fields) {
      init[f.name] = initialValues[f.name] !== undefined ? initialValues[f.name] : f.defaultValue || "";
    }
    return init;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (name: string, val: any) => {
    setValues((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const newErrors: Record<string, string> = {};
    for (const field of fields) {
      if (!field.hidden) {
        const err = validateFieldValue(field, values[field.name]);
        if (err) newErrors[field.name] = err;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSubmit(values);
    } catch (err: any) {
      setServerError(err.message || "Failed to submit form.");
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={`criation-schema-form ${className}`} noValidate>
      {serverError && (
        <div
          role="alert"
          style={{
            padding: "10px 14px",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            borderRadius: 6,
            marginBottom: 16,
            fontSize: "0.875rem",
          }}
        >
          {serverError}
        </div>
      )}

      <BaseStack direction="column" spacing="1.25rem">
        {fields.map((field) => {
          if (field.hidden) return null;
          const fieldId = `field-${field.name}`;
          const err = errors[field.name];

          if (field.type === "select") {
            const rawOptions = field.options || [];
            const selectOptions: SelectOption[] = rawOptions.map((opt) =>
              typeof opt === "string" ? { label: opt, value: opt } : opt
            );

            return (
              <div key={field.name} className="criation-form-control">
                <label
                  htmlFor={fieldId}
                  style={{ display: "block", marginBottom: 6, fontSize: "0.875rem", fontWeight: 600 }}
                >
                  {field.label || field.name}
                  {field.validation?.required && <span style={{ color: "#ef4444", marginLeft: 4 }}>*</span>}
                </label>
                <Select
                  id={fieldId}
                  value={values[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  options={selectOptions}
                  placeholder={field.placeholder || `Select ${field.label || field.name}...`}
                  error={err}
                  disabled={field.readOnly || isSubmitting}
                />
              </div>
            );
          }

          if (field.type === "textarea") {
            return (
              <div key={field.name} className="criation-form-control">
                <label
                  htmlFor={fieldId}
                  style={{ display: "block", marginBottom: 6, fontSize: "0.875rem", fontWeight: 600 }}
                >
                  {field.label || field.name}
                  {field.validation?.required && <span style={{ color: "#ef4444", marginLeft: 4 }}>*</span>}
                </label>
                <TextArea
                  id={fieldId}
                  value={values[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  error={err}
                  disabled={field.readOnly || isSubmitting}
                />
              </div>
            );
          }

          // Default input (text, email, number, date)
          return (
            <div key={field.name} className="criation-form-control">
              <label
                htmlFor={fieldId}
                style={{ display: "block", marginBottom: 6, fontSize: "0.875rem", fontWeight: 600 }}
              >
                {field.label || field.name}
                {field.validation?.required && <span style={{ color: "#ef4444", marginLeft: 4 }}>*</span>}
              </label>
              <BaseInput
                id={fieldId}
                type={field.type === "email" ? "email" : field.type === "number" ? "number" : "text"}
                value={values[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                error={err}
                disabled={field.readOnly || isSubmitting}
              />
            </div>
          );
        })}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 12 }}>
          {onCancel && (
            <BaseButton
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {cancelLabel}
            </BaseButton>
          )}
          <BaseButton
            type="submit"
            variant="primary"
            loading={isSubmitting}
          >
            {submitLabel}
          </BaseButton>
        </div>
      </BaseStack>
    </form>
  );
}
