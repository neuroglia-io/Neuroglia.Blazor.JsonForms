import { ControlElement, JsonSchema, LabelDescription } from '../models';
export declare const createCleanLabel: (label: string) => string;
/**
 * Return a label object based on the given control and schema element.
 * @param {ControlElement} withLabel the UI schema to obtain a label object for
 * @param {JsonSchema} schema optional: the corresponding schema element
 * @returns {LabelDescription}
 */
export declare const createLabelDescriptionFrom: (withLabel: ControlElement, schema?: JsonSchema) => LabelDescription;
