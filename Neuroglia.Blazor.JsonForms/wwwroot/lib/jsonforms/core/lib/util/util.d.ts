import { JsonSchema, Scoped, UISchemaElement } from '..';
import Ajv from 'ajv';
/**
 * Escape the given string such that it can be used as a class name,
 * i.e. hashes and slashes will be replaced.
 *
 * @param {string} s the string that should be converted to a valid class name
 * @returns {string} the escaped string
 */
export declare const convertToValidClassName: (s: string) => string;
export declare const formatErrorMessage: (errors: string[]) => string;
export declare const hasType: (jsonSchema: JsonSchema, expected: string) => boolean;
/**
 * Derives the type of the jsonSchema element
 */
export declare const deriveTypes: (jsonSchema: JsonSchema) => string[];
/**
 * Convenience wrapper around resolveData and resolveSchema.
 */
export declare const Resolve: {
    schema(schema: JsonSchema, schemaPath: string, rootSchema: JsonSchema): JsonSchema;
    data(data: any, path: string): any;
};
export declare const Paths: {
    compose: (path1: string, path2: string) => string;
    fromScoped: (scopable: Scoped) => string;
};
export declare const Runtime: {
    isEnabled(uischema: UISchemaElement, data: any, ajv: Ajv): boolean;
    isVisible(uischema: UISchemaElement, data: any, ajv: Ajv): boolean;
};
