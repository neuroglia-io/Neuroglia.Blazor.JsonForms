import { ControlElement, JsonSchema, LabelDescription } from './models';
export declare const Helpers: {
    createLabelDescriptionFrom(withLabel: ControlElement, schema: JsonSchema): LabelDescription;
    convertToValidClassName(s: string): string;
};
