import { JsonSchema, UISchemaElement } from '../models';
import Ajv from 'ajv';
import { JsonFormsState } from '../store';
export declare const evalVisibility: (uischema: UISchemaElement, data: any, path: string, ajv: Ajv) => boolean;
export declare const evalEnablement: (uischema: UISchemaElement, data: any, path: string, ajv: Ajv) => boolean;
export declare const hasShowRule: (uischema: UISchemaElement) => boolean;
export declare const hasEnableRule: (uischema: UISchemaElement) => boolean;
export declare const isVisible: (uischema: UISchemaElement, data: any, path: string, ajv: Ajv) => boolean;
export declare const isEnabled: (uischema: UISchemaElement, data: any, path: string, ajv: Ajv) => boolean;
/**
 * Indicates whether the given `uischema` element shall be enabled or disabled.
 * Checks the global readonly flag, uischema rule, uischema options (including the config),
 * the schema and the enablement indicator of the parent.
 */
export declare const isInherentlyEnabled: (state: JsonFormsState, ownProps: any, uischema: UISchemaElement, schema: (JsonSchema & {
    readOnly?: boolean;
}) | undefined, rootData: any, config: any) => any;
