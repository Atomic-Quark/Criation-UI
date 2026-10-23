import { parseEnglishDescription } from "./englishParser";
import { parseStructuredDSL } from "./structuredParser";
import { generateReactApplication, type CodegenResult } from "./codegen";
import { validateApplicationModel, type ApplicationModel } from "../engine/model";

export * from "./englishParser";
export * from "./structuredParser";
export * from "./codegen";

/**
 * End-to-end compilation from plain-English description to complete React application files.
 */
export function compileEnglishToReact(englishText: string): CodegenResult & { model: ApplicationModel; errors: string[] } {
  const model = parseEnglishDescription(englishText);
  const errors = validateApplicationModel(model);
  const codegenResult = generateReactApplication(model);

  return {
    ...codegenResult,
    model,
    errors,
  };
}

/**
 * End-to-end compilation from Mode B structured DSL to complete React application files.
 */
export function compileStructuredToReact(dslText: string): CodegenResult & { model: ApplicationModel; errors: string[] } {
  const model = parseStructuredDSL(dslText);
  const errors = validateApplicationModel(model);
  const codegenResult = generateReactApplication(model);

  return {
    ...codegenResult,
    model,
    errors,
  };
}
