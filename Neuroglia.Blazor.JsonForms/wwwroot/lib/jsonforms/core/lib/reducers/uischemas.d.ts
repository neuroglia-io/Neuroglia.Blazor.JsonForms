import { UISchemaActions } from '../actions';
import { JsonSchema, UISchemaElement } from '../models';
import { Reducer } from '../util';
export declare type UISchemaTester = (schema: JsonSchema, schemaPath: string, path: string) => number;
export interface JsonFormsUISchemaRegistryEntry {
    tester: UISchemaTester;
    uischema: UISchemaElement;
}
export declare const uischemaRegistryReducer: Reducer<JsonFormsUISchemaRegistryEntry[], UISchemaActions>;
export declare const findMatchingUISchema: (state: JsonFormsUISchemaRegistryEntry[]) => (jsonSchema: JsonSchema, schemaPath: string, path: string) => UISchemaElement;
