import { ControlElement, JsonSchema, UISchemaElement } from '../models';
import { JsonFormsUISchemaRegistryEntry } from '../reducers';
export interface CombinatorSubSchemaRenderInfo {
    schema: JsonSchema;
    uischema: UISchemaElement;
    label: string;
}
export declare type CombinatorKeyword = 'anyOf' | 'oneOf' | 'allOf';
export declare const createCombinatorRenderInfos: (combinatorSubSchemas: JsonSchema[], rootSchema: JsonSchema, keyword: CombinatorKeyword, control: ControlElement, path: string, uischemas: JsonFormsUISchemaRegistryEntry[]) => CombinatorSubSchemaRenderInfo[];
