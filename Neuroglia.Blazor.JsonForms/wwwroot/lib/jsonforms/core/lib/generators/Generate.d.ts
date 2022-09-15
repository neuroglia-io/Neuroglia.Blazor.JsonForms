import { ControlElement, JsonSchema, UISchemaElement } from '../';
export declare const Generate: {
    jsonSchema(instance: Object, options?: any): JsonSchema;
    uiSchema(jsonSchema: JsonSchema, layoutType?: string, prefix?: string, rootSchema?: JsonSchema): UISchemaElement;
    controlElement(ref: string): ControlElement;
};
