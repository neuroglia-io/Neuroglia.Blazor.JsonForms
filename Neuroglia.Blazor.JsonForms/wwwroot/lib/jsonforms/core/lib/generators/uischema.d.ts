import { ControlElement, JsonSchema, UISchemaElement } from '../models';
/**
 * Creates a IControlObject with the given label referencing the given ref
 */
export declare const createControlElement: (ref: string) => ControlElement;
/**
 * Generate a default UI schema.
 * @param {JsonSchema} jsonSchema the JSON schema to generated a UI schema for
 * @param {string} layoutType the desired layout type for the root layout
 *        of the generated UI schema
 */
export declare const generateDefaultUISchema: (jsonSchema: JsonSchema, layoutType?: string, prefix?: string, rootSchema?: JsonSchema) => UISchemaElement;
