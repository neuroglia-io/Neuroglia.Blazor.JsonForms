import Ajv, { ErrorObject, ValidateFunction } from 'ajv';
import { CoreActions } from '../actions';
import { Reducer } from '../util';
import { JsonSchema, UISchemaElement } from '../models';
export declare const validate: (validator: ValidateFunction | undefined, data: any) => ErrorObject[];
export declare type ValidationMode = 'ValidateAndShow' | 'ValidateAndHide' | 'NoValidation';
export interface JsonFormsCore {
    data: any;
    schema: JsonSchema;
    uischema: UISchemaElement;
    errors?: ErrorObject[];
    additionalErrors?: ErrorObject[];
    validator?: ValidateFunction;
    ajv?: Ajv;
    validationMode?: ValidationMode;
}
export declare const coreReducer: Reducer<JsonFormsCore, CoreActions>;
export declare const extractData: (state: JsonFormsCore) => any;
export declare const extractSchema: (state: JsonFormsCore) => JsonSchema;
export declare const extractUiSchema: (state: JsonFormsCore) => UISchemaElement;
export declare const extractAjv: (state: JsonFormsCore) => Ajv;
export declare const getControlPath: (error: ErrorObject) => any;
export declare const errorsAt: (instancePath: string, schema: JsonSchema, matchPath: (path: string) => boolean) => (errors: ErrorObject[]) => ErrorObject[];
export declare const errorAt: (instancePath: string, schema: JsonSchema) => (state: JsonFormsCore) => ErrorObject[];
export declare const subErrorsAt: (instancePath: string, schema: JsonSchema) => (state: JsonFormsCore) => ErrorObject[];
