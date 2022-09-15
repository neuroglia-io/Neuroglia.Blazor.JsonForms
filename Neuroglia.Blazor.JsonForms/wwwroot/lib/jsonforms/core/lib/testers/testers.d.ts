import { Categorization, ControlElement, JsonSchema, UISchemaElement } from '../models';
/**
 * Constant that indicates that a tester is not capable of handling
 * a combination of schema/data.
 * @type {number}
 */
export declare const NOT_APPLICABLE = -1;
/**
 * A tester is a function that receives an UI schema and a JSON schema and returns a boolean.
 * The rootSchema is handed over as context. Can be used to resolve references.
 */
export declare type Tester = (uischema: UISchemaElement, schema: JsonSchema, context: TesterContext) => boolean;
/**
 * A ranked tester associates a tester with a number.
 */
export declare type RankedTester = (uischema: UISchemaElement, schema: JsonSchema, context: TesterContext) => number;
/**
 * Additional context given to a tester in addition to UISchema and JsonSchema.
 */
export interface TesterContext {
    /** The root JsonSchema of the form. Can be used to resolve references. */
    rootSchema: JsonSchema;
    /** The form wide configuration object given to JsonForms. */
    config: any;
}
export declare const isControl: (uischema: any) => uischema is ControlElement;
/**
 * Only applicable for Controls.
 *
 * This function checks whether the given UI schema is of type Control
 * and if so, resolves the sub-schema referenced by the control and applies
 * the given predicate
 *
 * @param {(JsonSchema) => boolean} predicate the predicate that should be
 *        applied to the resolved sub-schema
 */
export declare const schemaMatches: (predicate: (schema: JsonSchema, rootSchema: JsonSchema) => boolean) => Tester;
export declare const schemaSubPathMatches: (subPath: string, predicate: (schema: JsonSchema, rootSchema: JsonSchema) => boolean) => Tester;
/**
 * Only applicable for Controls.
 *
 * This function checks whether the given UI schema is of type Control
 * and if so, resolves the sub-schema referenced by the control and checks
 * whether the type of the sub-schema matches the expected one.
 *
 * @param {string} expectedType the expected type of the resolved sub-schema
 */
export declare const schemaTypeIs: (expectedType: string) => Tester;
/**
 * Only applicable for Controls.
 *
 * This function checks whether the given UI schema is of type Control
 * and if so, resolves the sub-schema referenced by the control and checks
 * whether the format of the sub-schema matches the expected one.
 *
 * @param {string} expectedFormat the expected format of the resolved sub-schema
 */
export declare const formatIs: (expectedFormat: string) => Tester;
/**
 * Checks whether the given UI schema has the expected type.
 *
 * @param {string} expected the expected UI schema type
 */
export declare const uiTypeIs: (expected: string) => Tester;
/**
 * Checks whether the given UI schema has an option with the given
 * name and whether it has the expected value. If no options property
 * is set, returns false.
 *
 * @param {string} optionName the name of the option to check
 * @param {any} optionValue the expected value of the option
 */
export declare const optionIs: (optionName: string, optionValue: any) => Tester;
/**
 * Only applicable for Controls.
 *
 * Checks whether the scope of a control ends with the expected string.
 *
 * @param {string} expected the expected ending of the reference
 */
export declare const scopeEndsWith: (expected: string) => Tester;
/**
 * Only applicable for Controls.
 *
 * Checks whether the last segment of the scope matches the expected string.
 *
 * @param {string} expected the expected ending of the reference
 */
export declare const scopeEndIs: (expected: string) => Tester;
/**
 * A tester that allow composing other testers by && them.
 *
 * @param {Array<Tester>} testers the testers to be composed
 */
export declare const and: (...testers: Tester[]) => Tester;
/**
 * A tester that allow composing other testers by || them.
 *
 * @param {Array<Tester>} testers the testers to be composed
 */
export declare const or: (...testers: Tester[]) => Tester;
/**
 * Create a ranked tester that will associate a number with a given tester, if the
 * latter returns true.
 *
 * @param {number} rank the rank to be returned in case the tester returns true
 * @param {Tester} tester a tester
 */
export declare const rankWith: (rank: number, tester: Tester) => (uischema: UISchemaElement, schema: JsonSchema, context: TesterContext) => number;
export declare const withIncreasedRank: (by: number, rankedTester: RankedTester) => (uischema: UISchemaElement, schema: JsonSchema, context: TesterContext) => number;
/**
 * Default tester for boolean.
 * @type {RankedTester}
 */
export declare const isBooleanControl: Tester;
export declare const isObjectControl: Tester;
export declare const isAllOfControl: Tester;
export declare const isAnyOfControl: Tester;
export declare const isOneOfControl: Tester;
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * has an enum.
 * @type {Tester}
 */
export declare const isEnumControl: Tester;
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * has an enum based on oneOf.
 * @type {Tester}
 */
export declare const isOneOfEnumControl: Tester;
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * is of type integer
 * @type {Tester}
 */
export declare const isIntegerControl: Tester;
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * is of type number
 * @type {Tester}
 */
export declare const isNumberControl: Tester;
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * is of type string
 * @type {Tester}
 */
export declare const isStringControl: Tester;
/**
 * Tests whether the given UI schema is of type Control and if is has
 * a 'multi' option.
 * @type {Tester}
 */
export declare const isMultiLineControl: Tester;
/**
 * Tests whether the given UI schema is of type Control and whether the schema
 * or uischema options has a 'date' format.
 * @type {Tester}
 */
export declare const isDateControl: Tester;
/**
 * Tests whether the given UI schema is of type Control and whether the schema
 * or the uischema options has a 'time' format.
 * @type {Tester}
 */
export declare const isTimeControl: Tester;
/**
 * Tests whether the given UI schema is of type Control and whether the schema
 * or the uischema options has a 'date-time' format.
 * @type {Tester}
 */
export declare const isDateTimeControl: Tester;
/**
 * Tests whether the given schema is an array of objects.
 * @type {Tester}
 */
export declare const isObjectArray: Tester;
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * is an array of objects.
 * @type {Tester}
 */
export declare const isObjectArrayControl: Tester;
export declare const isObjectArrayWithNesting: (uischema: UISchemaElement, schema: JsonSchema, context: TesterContext) => boolean;
/**
 * Synonym for isObjectArrayControl
 */
export declare const isArrayObjectControl: Tester;
/**
 * Tests whether the given UI schema is of type Control and if the schema
 * is an array of a primitive type.
 * @type {Tester}
 */
export declare const isPrimitiveArrayControl: Tester;
/**
 * Tests whether a given UI schema is of type Control,
 * if the schema is of type number or integer and
 * whether the schema defines a numerical range with a default value.
 * @type {Tester}
 */
export declare const isRangeControl: Tester;
/**
 * Tests whether the given UI schema is of type Control, if the schema
 * is of type integer and has option format
 * @type {Tester}
 */
export declare const isNumberFormatControl: Tester;
export declare const isCategorization: (category: UISchemaElement) => category is Categorization;
export declare const isCategory: (uischema: UISchemaElement) => boolean;
export declare const hasCategory: (categorization: Categorization) => boolean;
export declare const categorizationHasCategory: (uischema: UISchemaElement) => boolean;
export declare const not: (tester: Tester) => Tester;
