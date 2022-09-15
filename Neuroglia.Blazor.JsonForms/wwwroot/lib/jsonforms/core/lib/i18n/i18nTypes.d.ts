import { ErrorObject } from 'ajv';
import { JsonSchema, UISchemaElement } from '../models';
export declare type Translator = {
    (id: string, defaultMessage: string, values?: any): string;
    (id: string, defaultMessage: undefined, values?: any): string | undefined;
};
export declare type ErrorTranslator = (error: ErrorObject, translate: Translator, uischema?: UISchemaElement) => string;
export interface JsonFormsI18nState {
    locale?: string;
    translate?: Translator;
    translateError?: ErrorTranslator;
}
export declare type i18nJsonSchema = JsonSchema & {
    i18n?: string;
};
