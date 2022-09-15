import { ErrorObject } from 'ajv';
import { Labelable, UISchemaElement } from '../models';
import { i18nJsonSchema, ErrorTranslator, Translator } from './i18nTypes';
export declare const getI18nKeyPrefixBySchema: (schema: i18nJsonSchema | undefined, uischema: unknown | undefined) => string | undefined;
/**
 * Transforms a given path to a prefix which can be used for i18n keys.
 * Returns 'root' for empty paths and removes array indices
 */
export declare const transformPathToI18nPrefix: (path: string) => string;
export declare const getI18nKeyPrefix: (schema: i18nJsonSchema | undefined, uischema: unknown | undefined, path: string | undefined) => string;
export declare const getI18nKey: (schema: i18nJsonSchema | undefined, uischema: unknown | undefined, path: string | undefined, key: string) => string;
export declare const defaultTranslator: Translator;
export declare const defaultErrorTranslator: ErrorTranslator;
/**
 * Returns the determined error message for the given errors.
 * All errors must correspond to the given schema, uischema or path.
 */
export declare const getCombinedErrorMessage: (errors: ErrorObject[], et: ErrorTranslator, t: Translator, schema?: i18nJsonSchema, uischema?: UISchemaElement, path?: string) => string;
/**
 * This can be used to internationalize the label of the given Labelable (e.g. UI Schema elements).
 * This should not be used for controls as there we have additional context in the form of the JSON Schema available.
 */
export declare const deriveLabelForUISchemaElement: (uischema: Labelable<boolean>, t: Translator) => string | undefined;
