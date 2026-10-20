import React, { forwardRef } from "react";
import { Input, type InputProps } from "./Input";

export interface TextInputProps extends InputProps {}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return <Input ref={ref} type="text" {...props} />;
});

TextInput.displayName = "TextInput";
