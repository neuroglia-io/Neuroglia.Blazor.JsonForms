import { ControlElement, UISchemaElement } from '../models';
import { JsonFormsState } from '../store';
import type { JsonFormsUISchemaRegistryEntry } from './uischemas';
import { JsonSchema } from '../models/jsonSchema';
import { ErrorTranslator, Translator } from '../i18n';
export declare const jsonFormsReducerConfig: {
    core: import("..").Reducer<import("./core").JsonFormsCore, import("..").CoreActions>;
    renderers: import("..").Reducer<import("./renderers").JsonFormsRendererRegistryEntry[], import("..").AddRendererAction | import("..").RemoveRendererAction>;
    cells: import("..").Reducer<import("./cells").JsonFormsCellRendererRegistryState, import("..").AddCellRendererAction | import("..").RemoveCellRendererAction>;
    config: import("..").Reducer<any, import("..").SetConfigAction>;
    uischemas: import("..").Reducer<JsonFormsUISchemaRegistryEntry[], import("..").UISchemaActions>;
    defaultData: import("..").Reducer<import("./default-data").JsonFormsDefaultDataRegistryEntry[], import("..").RegisterDefaultDataAction | import("..").UnregisterDefaultDataAction>;
    i18n: import("..").Reducer<import("../i18n").JsonFormsI18nState, import("..").I18nActions>;
};
/**
 * Finds a registered UI schema to use, if any.
 * @param schema the JSON schema describing the data to be rendered
 * @param schemaPath the according schema path
 * @param path the instance path
 * @param fallback the type of the layout to use or a UI-schema-generator function
 * @param control may be checked for embedded inline uischema options
 */
export declare const findUISchema: (uischemas: JsonFormsUISchemaRegistryEntry[], schema: JsonSchema, schemaPath: string, path: string, fallback?: string | (() => UISchemaElement), control?: ControlElement, rootSchema?: JsonSchema) => UISchemaElement;
export declare const getErrorAt: (instancePath: string, schema: JsonSchema) => (state: JsonFormsState) => import("ajv").ErrorObject<string, Record<string, any>, unknown>[];
export declare const getSubErrorsAt: (instancePath: string, schema: JsonSchema) => (state: JsonFormsState) => import("ajv").ErrorObject<string, Record<string, any>, unknown>[];
export declare const getConfig: (state: JsonFormsState) => any;
export declare const getLocale: (state: JsonFormsState) => string;
export declare const getTranslator: () => (state: JsonFormsState) => Translator;
export declare const getErrorTranslator: () => (state: JsonFormsState) => ErrorTranslator;
