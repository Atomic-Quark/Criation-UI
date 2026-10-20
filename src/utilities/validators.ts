export const validators = {
  required: (msg = "This field is required") => (value: unknown): string | null => {
    if (value === undefined || value === null || value === "") return msg;
    if (Array.isArray(value) && value.length === 0) return msg;
    return null;
  },

  email: (msg = "Please enter a valid email address") => (value: string): string | null => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : msg;
  },

  minLength: (min: number, msg?: string) => (value: string): string | null => {
    if (!value) return null;
    return value.length >= min
      ? null
      : msg || `Must be at least ${min} characters`;
  },

  maxLength: (max: number, msg?: string) => (value: string): string | null => {
    if (!value) return null;
    return value.length <= max
      ? null
      : msg || `Must not exceed ${max} characters`;
  },

  matches: (regex: RegExp, msg = "Invalid format") => (value: string): string | null => {
    if (!value) return null;
    return regex.test(value) ? null : msg;
  },
};
