import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import keys from 'lodash/keys';
import union from 'lodash/union';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import setFp from 'lodash/fp/set';
import get from 'lodash/get';
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import maxBy from 'lodash/maxBy';
import remove from 'lodash/remove';
import endsWith from 'lodash/endsWith';
import last from 'lodash/last';
import isArray from 'lodash/isArray';
import reduce from 'lodash/reduce';
import toPairs from 'lodash/toPairs';
import includes from 'lodash/includes';
import find from 'lodash/find';
import range from 'lodash/range';
import has from 'lodash/has';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ADDITIONAL_PROPERTIES = 'additionalProperties';
const REQUIRED_PROPERTIES = 'required';
const distinct = (properties, discriminator) => {
    const known = {};
    return properties.filter(item => {
        const discriminatorValue = discriminator(item);
        if (known.hasOwnProperty(discriminatorValue)) {
            return false;
        }
        else {
            known[discriminatorValue] = true;
            return true;
        }
    });
};
class Gen {
    constructor(findOption) {
        this.findOption = findOption;
        this.schemaObject = (data) => {
            const props = this.properties(data);
            const schema = {
                type: 'object',
                properties: props,
                additionalProperties: this.findOption(props)(ADDITIONAL_PROPERTIES)
            };
            const required = this.findOption(props)(REQUIRED_PROPERTIES);
            if (required.length > 0) {
                schema.required = required;
            }
            return schema;
        };
        this.properties = (data) => {
            const emptyProps = {};
            return Object.keys(data).reduce((acc, propName) => {
                acc[propName] = this.property(data[propName]);
                return acc;
            }, emptyProps);
        };
        this.property = (data) => {
            switch (typeof data) {
                case 'string':
                    return { type: 'string' };
                case 'boolean':
                    return { type: 'boolean' };
                case 'number':
                    if (Number.isInteger(data)) {
                        return { type: 'integer' };
                    }
                    return { type: 'number' };
                case 'object':
                    if (data == null) {
                        return { type: 'null' };
                    }
                    return this.schemaObjectOrArray(data);
                default:
                    return {};
            }
        };
        this.schemaObjectOrArray = (data) => {
            if (data instanceof Array) {
                return this.schemaArray(data);
            }
            else {
                return this.schemaObject(data);
            }
        };
        this.schemaArray = (data) => {
            if (data.length > 0) {
                const allProperties = data.map(this.property);
                const uniqueProperties = distinct(allProperties, prop => JSON.stringify(prop));
                if (uniqueProperties.length === 1) {
                    return {
                        type: 'array',
                        items: uniqueProperties[0]
                    };
                }
                else {
                    return {
                        type: 'array',
                        items: {
                            oneOf: uniqueProperties
                        }
                    };
                }
            }
            else {
                return {
                    type: 'array',
                    items: {}
                };
            }
        };
    }
}
const generateJsonSchema = (instance, options = {}) => {
    const findOption = (props) => (optionName) => {
        switch (optionName) {
            case ADDITIONAL_PROPERTIES:
                if (options.hasOwnProperty(ADDITIONAL_PROPERTIES)) {
                    return options[ADDITIONAL_PROPERTIES];
                }
                return true;
            case REQUIRED_PROPERTIES:
                if (options.hasOwnProperty(REQUIRED_PROPERTIES)) {
                    return options[REQUIRED_PROPERTIES](props);
                }
                return Object.keys(props);
            default:
                return;
        }
    };
    const gen = new Gen(findOption);
    return gen.schemaObject(instance);
};

const Draft4 = {
    id: 'http://json-schema.org/draft-04/schema#',
    $schema: 'http://json-schema.org/draft-04/schema#',
    description: 'Core schema meta-schema',
    definitions: {
        schemaArray: {
            type: 'array',
            minItems: 1,
            items: { $ref: '#' }
        },
        positiveInteger: {
            type: 'integer',
            minimum: 0
        },
        positiveIntegerDefault0: {
            allOf: [{ $ref: '#/definitions/positiveInteger' }, { default: 0 }]
        },
        simpleTypes: {
            enum: [
                'array',
                'boolean',
                'integer',
                'null',
                'number',
                'object',
                'string'
            ]
        },
        stringArray: {
            type: 'array',
            items: { type: 'string' },
            minItems: 1,
            uniqueItems: true
        }
    },
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uri'
        },
        $schema: {
            type: 'string',
            format: 'uri'
        },
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        default: {},
        multipleOf: {
            type: 'number',
            minimum: 0,
            exclusiveMinimum: true
        },
        maximum: {
            type: 'number'
        },
        exclusiveMaximum: {
            type: 'boolean',
            default: false
        },
        minimum: {
            type: 'number'
        },
        exclusiveMinimum: {
            type: 'boolean',
            default: false
        },
        maxLength: { $ref: '#/definitions/positiveInteger' },
        minLength: { $ref: '#/definitions/positiveIntegerDefault0' },
        pattern: {
            type: 'string',
            format: 'regex'
        },
        additionalItems: {
            anyOf: [{ type: 'boolean' }, { $ref: '#' }],
            default: {}
        },
        items: {
            anyOf: [{ $ref: '#' }, { $ref: '#/definitions/schemaArray' }],
            default: {}
        },
        maxItems: { $ref: '#/definitions/positiveInteger' },
        minItems: { $ref: '#/definitions/positiveIntegerDefault0' },
        uniqueItems: {
            type: 'boolean',
            default: false
        },
        maxProperties: { $ref: '#/definitions/positiveInteger' },
        minProperties: { $ref: '#/definitions/positiveIntegerDefault0' },
        required: { $ref: '#/definitions/stringArray' },
        additionalProperties: {
            anyOf: [{ type: 'boolean' }, { $ref: '#' }],
            default: {}
        },
        definitions: {
            type: 'object',
            additionalProperties: { $ref: '#' },
            default: {}
        },
        properties: {
            type: 'object',
            additionalProperties: { $ref: '#' },
            default: {}
        },
        patternProperties: {
            type: 'object',
            additionalProperties: { $ref: '#' },
            default: {}
        },
        dependencies: {
            type: 'object',
            additionalProperties: {
                anyOf: [{ $ref: '#' }, { $ref: '#/definitions/stringArray' }]
            }
        },
        enum: {
            type: 'array',
            minItems: 1,
            uniqueItems: true
        },
        type: {
            anyOf: [
                { $ref: '#/definitions/simpleTypes' },
                {
                    type: 'array',
                    items: { $ref: '#/definitions/simpleTypes' },
                    minItems: 1,
                    uniqueItems: true
                }
            ]
        },
        allOf: { $ref: '#/definitions/schemaArray' },
        anyOf: { $ref: '#/definitions/schemaArray' },
        oneOf: { $ref: '#/definitions/schemaArray' },
        not: { $ref: '#' }
    },
    dependencies: {
        exclusiveMaximum: ['maximum'],
        exclusiveMinimum: ['minimum']
    },
    default: {}
};

var RuleEffect;
(function (RuleEffect) {
    RuleEffect["HIDE"] = "HIDE";
    RuleEffect["SHOW"] = "SHOW";
    RuleEffect["ENABLE"] = "ENABLE";
    RuleEffect["DISABLE"] = "DISABLE";
})(RuleEffect || (RuleEffect = {}));
const isInternationalized = (element) => typeof element === 'object' && element !== null && typeof element.i18n === 'string';
const isGroup = (layout) => layout.type === 'Group';
const isLayout = (uischema) => uischema.elements !== undefined;
const isScopable = (obj) => obj && typeof obj === 'object';
const isScoped = (obj) => isScopable(obj) && typeof obj.scope === 'string';
const isLabelable = (obj) => obj && typeof obj === 'object';
const isLabeled = (obj) => isLabelable(obj) && ['string', 'boolean'].includes(typeof obj.label);

const move = (array, index, delta) => {
    const newIndex = index + delta;
    if (newIndex < 0 || newIndex >= array.length) {
        return;
    }
    const indexes = [index, newIndex].sort((a, b) => a - b);
    array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]);
};
const moveUp = (array, toMove) => {
    move(array, toMove, -1);
};
const moveDown = (array, toMove) => {
    move(array, toMove, 1);
};

const cellReducer = (state = [], { type, tester, cell }) => {
    switch (type) {
        case ADD_CELL:
            return state.concat([{ tester, cell }]);
        case REMOVE_CELL:
            return state.filter(t => t.tester !== tester);
        default:
            return state;
    }
};

const configDefault = {
    restrict: false,
    trim: false,
    showUnfocusedDescription: false,
    hideRequiredAsterisk: false
};

const applyDefaultConfiguration = (config = {}) => merge({}, configDefault, config);
const configReducer = (state = applyDefaultConfiguration(), action) => {
    switch (action.type) {
        case SET_CONFIG:
            return applyDefaultConfiguration(action.config);
        default:
            return state;
    }
};

const validate = (validator, data) => {
    if (validator === undefined) {
        return [];
    }
    const valid = validator(data);
    if (valid) {
        return [];
    }
    return validator.errors;
};
const initState = {
    data: {},
    schema: {},
    uischema: undefined,
    errors: [],
    validator: undefined,
    ajv: undefined,
    validationMode: 'ValidateAndShow',
    additionalErrors: []
};
const reuseAjvForSchema = (ajv, schema) => {
    if (schema.hasOwnProperty('id') || schema.hasOwnProperty('$id')) {
        ajv.removeSchema(schema);
    }
    return ajv;
};
const getOrCreateAjv = (state, action) => {
    if (action) {
        if (hasAjvOption(action.options)) {
            return action.options.ajv;
        }
        else if (action.options !== undefined) {
            if (isFunction(action.options.compile)) {
                return action.options;
            }
        }
    }
    if (state.ajv) {
        return action?.schema
            ? reuseAjvForSchema(state.ajv, action.schema)
            : state.ajv;
    }
    return createAjv();
};
const hasAjvOption = (option) => {
    if (option) {
        return option.ajv !== undefined;
    }
    return false;
};
const getValidationMode = (state, action) => {
    if (action && hasValidationModeOption(action.options)) {
        return action.options.validationMode;
    }
    return state.validationMode;
};
const hasValidationModeOption = (option) => {
    if (option) {
        return option.validationMode !== undefined;
    }
    return false;
};
const hasAdditionalErrorsOption = (option) => {
    if (option) {
        return option.additionalErrors !== undefined;
    }
    return false;
};
const getAdditionalErrors = (state, action) => {
    if (action && hasAdditionalErrorsOption(action.options)) {
        return action.options.additionalErrors;
    }
    return state.additionalErrors;
};
const coreReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT: {
            const thisAjv = getOrCreateAjv(state, action);
            const validationMode = getValidationMode(state, action);
            const v = validationMode === 'NoValidation' ? undefined : thisAjv.compile(action.schema);
            const e = validate(v, action.data);
            const additionalErrors = getAdditionalErrors(state, action);
            return {
                ...state,
                data: action.data,
                schema: action.schema,
                uischema: action.uischema,
                additionalErrors,
                errors: e,
                validator: v,
                ajv: thisAjv,
                validationMode,
            };
        }
        case UPDATE_CORE: {
            const thisAjv = getOrCreateAjv(state, action);
            const validationMode = getValidationMode(state, action);
            let validator = state.validator;
            let errors = state.errors;
            if (state.schema !== action.schema ||
                state.validationMode !== validationMode ||
                state.ajv !== thisAjv) {
                validator =
                    validationMode === 'NoValidation'
                        ? undefined
                        : thisAjv.compile(action.schema);
                errors = validate(validator, action.data);
            }
            else if (state.data !== action.data) {
                errors = validate(validator, action.data);
            }
            const additionalErrors = getAdditionalErrors(state, action);
            const stateChanged = state.data !== action.data ||
                state.schema !== action.schema ||
                state.uischema !== action.uischema ||
                state.ajv !== thisAjv ||
                state.errors !== errors ||
                state.validator !== validator ||
                state.validationMode !== validationMode ||
                state.additionalErrors !== additionalErrors;
            return stateChanged
                ? {
                    ...state,
                    data: action.data,
                    schema: action.schema,
                    uischema: action.uischema,
                    ajv: thisAjv,
                    errors: isEqual(errors, state.errors) ? state.errors : errors,
                    validator: validator,
                    validationMode: validationMode,
                    additionalErrors
                }
                : state;
        }
        case SET_AJV: {
            const currentAjv = action.ajv;
            const validator = state.validationMode === 'NoValidation' ? undefined : currentAjv.compile(state.schema);
            const errors = validate(validator, state.data);
            return {
                ...state,
                validator,
                errors
            };
        }
        case SET_SCHEMA: {
            const needsNewValidator = action.schema && state.ajv && state.validationMode !== 'NoValidation';
            const v = needsNewValidator
                ? reuseAjvForSchema(state.ajv, action.schema).compile(action.schema)
                : state.validator;
            const errors = validate(v, state.data);
            return {
                ...state,
                validator: v,
                schema: action.schema,
                errors
            };
        }
        case SET_UISCHEMA: {
            return {
                ...state,
                uischema: action.uischema
            };
        }
        case UPDATE_DATA: {
            if (action.path === undefined || action.path === null) {
                return state;
            }
            else if (action.path === '') {
                const result = action.updater(cloneDeep(state.data));
                const errors = validate(state.validator, result);
                return {
                    ...state,
                    data: result,
                    errors
                };
            }
            else {
                const oldData = get(state.data, action.path);
                const newData = action.updater(cloneDeep(oldData));
                const newState = setFp(action.path, newData, state.data === undefined ? {} : state.data);
                const errors = validate(state.validator, newState);
                return {
                    ...state,
                    data: newState,
                    errors
                };
            }
        }
        case UPDATE_ERRORS: {
            return {
                ...state,
                errors: action.errors
            };
        }
        case SET_VALIDATION_MODE: {
            if (state.validationMode === action.validationMode) {
                return state;
            }
            if (action.validationMode === 'NoValidation') {
                const errors = validate(undefined, state.data);
                return {
                    ...state,
                    errors,
                    validationMode: action.validationMode
                };
            }
            if (state.validationMode === 'NoValidation') {
                const validator = reuseAjvForSchema(state.ajv, state.schema).compile(state.schema);
                const errors = validate(validator, state.data);
                return {
                    ...state,
                    validator,
                    errors,
                    validationMode: action.validationMode
                };
            }
            return {
                ...state,
                validationMode: action.validationMode
            };
        }
        default:
            return state;
    }
};
const extractData = (state) => get(state, 'data');
const extractSchema = (state) => get(state, 'schema');
const extractUiSchema = (state) => get(state, 'uischema');
const extractAjv = (state) => get(state, 'ajv');
const getInvalidProperty = (error) => {
    switch (error.keyword) {
        case 'required':
        case 'dependencies':
            return error.params.missingProperty;
        case 'additionalProperties':
            return error.params.additionalProperty;
        default:
            return undefined;
    }
};
const getControlPath = (error) => {
    const dataPath = error.dataPath;
    if (dataPath) {
        return dataPath.replace(/\//g, '.').substr(1);
    }
    var controlPath = error.instancePath;
    controlPath = controlPath.replace(/\//g, '.');
    const invalidProperty = getInvalidProperty(error);
    if (invalidProperty !== undefined && !controlPath.endsWith(invalidProperty)) {
        controlPath = `${controlPath}.${invalidProperty}`;
    }
    controlPath = controlPath.replace(/^./, '');
    return controlPath;
};
const errorsAt = (instancePath, schema, matchPath) => (errors) => {
    const combinatorPaths = filter(errors, error => error.keyword === 'oneOf' || error.keyword === 'anyOf').map(error => getControlPath(error));
    return filter(errors, error => {
        if (filteredErrorKeywords.indexOf(error.keyword) !== -1) {
            return false;
        }
        const controlPath = getControlPath(error);
        let result = matchPath(controlPath);
        const parentSchema = error.parentSchema;
        if (result && !isObjectSchema$1(parentSchema)
            && combinatorPaths.findIndex(p => instancePath.startsWith(p)) !== -1) {
            result = result && isEqual(parentSchema, schema);
        }
        return result;
    });
};
const isObjectSchema$1 = (schema) => {
    return schema?.type === 'object' || !!schema?.properties;
};
const filteredErrorKeywords = ['additionalProperties', 'allOf', 'anyOf', 'oneOf'];
const getErrorsAt = (instancePath, schema, matchPath) => (state) => {
    const errors = state.errors ?? [];
    const additionalErrors = state.additionalErrors ?? [];
    return errorsAt(instancePath, schema, matchPath)(state.validationMode === 'ValidateAndHide' ? additionalErrors : [...errors, ...additionalErrors]);
};
const errorAt = (instancePath, schema) => getErrorsAt(instancePath, schema, path => path === instancePath);
const subErrorsAt = (instancePath, schema) => getErrorsAt(instancePath, schema, path => path.startsWith(instancePath));

const defaultDataReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_DEFAULT_DATA:
            return state.concat([
                { schemaPath: action.schemaPath, data: action.data }
            ]);
        case REMOVE_DEFAULT_DATA:
            return state.filter(t => t.schemaPath !== action.schemaPath);
        default:
            return state;
    }
};
const extractDefaultData = (state) => state;

const getI18nKeyPrefixBySchema = (schema, uischema) => {
    if (isInternationalized(uischema)) {
        return uischema.i18n;
    }
    return schema?.i18n ?? undefined;
};
const transformPathToI18nPrefix = (path) => {
    return (path
        ?.split('.')
        .filter(segment => !/^\d+$/.test(segment))
        .join('.') || 'root');
};
const getI18nKeyPrefix = (schema, uischema, path) => {
    return (getI18nKeyPrefixBySchema(schema, uischema) ??
        transformPathToI18nPrefix(path));
};
const getI18nKey = (schema, uischema, path, key) => {
    return `${getI18nKeyPrefix(schema, uischema, path)}.${key}`;
};
const defaultTranslator = (_id, defaultMessage) => defaultMessage;
const defaultErrorTranslator = (error, t, uischema) => {
    const i18nKey = getI18nKey(error.parentSchema, uischema, getControlPath(error), `error.${error.keyword}`);
    const specializedKeywordMessage = t(i18nKey, undefined, { error });
    if (specializedKeywordMessage !== undefined) {
        return specializedKeywordMessage;
    }
    const genericKeywordMessage = t(`error.${error.keyword}`, undefined, { error });
    if (genericKeywordMessage !== undefined) {
        return genericKeywordMessage;
    }
    const messageCustomization = t(error.message, undefined, { error });
    if (messageCustomization !== undefined) {
        return messageCustomization;
    }
    if (error.keyword === 'required' && error.message?.startsWith('must have required property')) {
        return t('is a required property', 'is a required property', { error });
    }
    return error.message;
};
const getCombinedErrorMessage = (errors, et, t, schema, uischema, path) => {
    if (errors.length > 0 && t) {
        const customErrorKey = getI18nKey(schema, uischema, path, 'error.custom');
        const specializedErrorMessage = t(customErrorKey, undefined, { schema, uischema, path, errors });
        if (specializedErrorMessage !== undefined) {
            return specializedErrorMessage;
        }
    }
    return formatErrorMessage(errors.map(error => et(error, t, uischema)));
};
const deriveLabelForUISchemaElement = (uischema, t) => {
    if (uischema.label === false) {
        return undefined;
    }
    if ((uischema.label === undefined || uischema.label === null || uischema.label === true) && !isInternationalized(uischema)) {
        return undefined;
    }
    const stringifiedLabel = typeof uischema.label === 'string' ? uischema.label : JSON.stringify(uischema.label);
    const i18nKeyPrefix = getI18nKeyPrefixBySchema(undefined, uischema);
    const i18nKey = typeof i18nKeyPrefix === 'string' ? `${i18nKeyPrefix}.label` : stringifiedLabel;
    return t(i18nKey, stringifiedLabel, { uischema: uischema });
};

const defaultJsonFormsI18nState = {
    locale: 'en',
    translate: defaultTranslator,
    translateError: defaultErrorTranslator
};
const i18nReducer = (state = defaultJsonFormsI18nState, action) => {
    switch (action.type) {
        case UPDATE_I18N: {
            const locale = action.locale ?? defaultJsonFormsI18nState.locale;
            const translate = action.translator ?? defaultJsonFormsI18nState.translate;
            const translateError = action.errorTranslator ?? defaultJsonFormsI18nState.translateError;
            if (locale !== state.locale ||
                translate !== state.translate ||
                translateError !== state.translateError) {
                return {
                    ...state,
                    locale,
                    translate,
                    translateError
                };
            }
            return state;
        }
        case SET_TRANSLATOR:
            return {
                ...state,
                translate: action.translator ?? defaultTranslator,
                translateError: action.errorTranslator ?? defaultErrorTranslator
            };
        case SET_LOCALE:
            return {
                ...state,
                locale: action.locale ?? navigator.languages[0]
            };
        default:
            return state;
    }
};
const fetchLocale = (state) => {
    if (state === undefined) {
        return undefined;
    }
    return state.locale;
};
const fetchTranslator = (state) => {
    if (state === undefined) {
        return defaultTranslator;
    }
    return state.translate;
};
const fetchErrorTranslator = (state) => {
    if (state === undefined) {
        return defaultErrorTranslator;
    }
    return state.translateError;
};

const rendererReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_RENDERER:
            return state.concat([
                { tester: action.tester, renderer: action.renderer }
            ]);
        case REMOVE_RENDERER:
            return state.filter(t => t.tester !== action.tester);
        default:
            return state;
    }
};

const NOT_APPLICABLE = -1;
const isControl = (uischema) => !isEmpty(uischema) && uischema.scope !== undefined;
const schemaMatches = (predicate) => (uischema, schema, context) => {
    if (isEmpty(uischema) || !isControl(uischema)) {
        return false;
    }
    if (isEmpty(schema)) {
        return false;
    }
    const schemaPath = uischema.scope;
    if (isEmpty(schemaPath)) {
        return false;
    }
    let currentDataSchema = schema;
    if (hasType(schema, 'object')) {
        currentDataSchema = resolveSchema(schema, schemaPath, context?.rootSchema);
    }
    if (currentDataSchema === undefined) {
        return false;
    }
    return predicate(currentDataSchema, context?.rootSchema);
};
const schemaSubPathMatches = (subPath, predicate) => (uischema, schema, context) => {
    if (isEmpty(uischema) || !isControl(uischema)) {
        return false;
    }
    const schemaPath = uischema.scope;
    let currentDataSchema = schema;
    if (hasType(schema, 'object')) {
        currentDataSchema = resolveSchema(schema, schemaPath, context?.rootSchema);
    }
    currentDataSchema = get(currentDataSchema, subPath);
    if (currentDataSchema === undefined) {
        return false;
    }
    return predicate(currentDataSchema, context?.rootSchema);
};
const schemaTypeIs = (expectedType) => schemaMatches(schema => !isEmpty(schema) && hasType(schema, expectedType));
const formatIs = (expectedFormat) => schemaMatches(schema => !isEmpty(schema) &&
    schema.format === expectedFormat &&
    hasType(schema, 'string'));
const uiTypeIs = (expected) => (uischema) => !isEmpty(uischema) && uischema.type === expected;
const optionIs = (optionName, optionValue) => (uischema) => {
    if (isEmpty(uischema)) {
        return false;
    }
    const options = uischema.options;
    return !isEmpty(options) && options[optionName] === optionValue;
};
const scopeEndsWith = (expected) => (uischema) => {
    if (isEmpty(expected) || !isControl(uischema)) {
        return false;
    }
    return endsWith(uischema.scope, expected);
};
const scopeEndIs = (expected) => (uischema) => {
    if (isEmpty(expected) || !isControl(uischema)) {
        return false;
    }
    const schemaPath = uischema.scope;
    return !isEmpty(schemaPath) && last(schemaPath.split('/')) === expected;
};
const and = (...testers) => (uischema, schema, context) => testers.reduce((acc, tester) => acc && tester(uischema, schema, context), true);
const or = (...testers) => (uischema, schema, context) => testers.reduce((acc, tester) => acc || tester(uischema, schema, context), false);
const rankWith = (rank, tester) => (uischema, schema, context) => {
    if (tester(uischema, schema, context)) {
        return rank;
    }
    return NOT_APPLICABLE;
};
const withIncreasedRank = (by, rankedTester) => (uischema, schema, context) => {
    const rank = rankedTester(uischema, schema, context);
    if (rank === NOT_APPLICABLE) {
        return NOT_APPLICABLE;
    }
    return rank + by;
};
const isBooleanControl = and(uiTypeIs('Control'), schemaTypeIs('boolean'));
const isObjectControl = and(uiTypeIs('Control'), schemaTypeIs('object'));
const isAllOfControl = and(uiTypeIs('Control'), schemaMatches(schema => schema.hasOwnProperty('allOf')));
const isAnyOfControl = and(uiTypeIs('Control'), schemaMatches(schema => schema.hasOwnProperty('anyOf')));
const isOneOfControl = and(uiTypeIs('Control'), schemaMatches(schema => schema.hasOwnProperty('oneOf')));
const isEnumControl = and(uiTypeIs('Control'), or(schemaMatches(schema => schema.hasOwnProperty('enum')), schemaMatches(schema => schema.hasOwnProperty('const'))));
const isOneOfEnumControl = and(uiTypeIs('Control'), schemaMatches(schema => schema.hasOwnProperty('oneOf') &&
    schema.oneOf.every(s => s.const !== undefined)));
const isIntegerControl = and(uiTypeIs('Control'), schemaTypeIs('integer'));
const isNumberControl = and(uiTypeIs('Control'), schemaTypeIs('number'));
const isStringControl = and(uiTypeIs('Control'), schemaTypeIs('string'));
const isMultiLineControl = and(uiTypeIs('Control'), optionIs('multi', true));
const isDateControl = and(uiTypeIs('Control'), or(formatIs('date'), optionIs('format', 'date')));
const isTimeControl = and(uiTypeIs('Control'), or(formatIs('time'), optionIs('format', 'time')));
const isDateTimeControl = and(uiTypeIs('Control'), or(formatIs('date-time'), optionIs('format', 'date-time')));
const isObjectArray = and(schemaMatches((schema, rootSchema) => hasType(schema, 'array') && !Array.isArray(resolveSchema(schema, 'items', rootSchema))
), schemaSubPathMatches('items', (schema, rootSchema) => {
    const resolvedSchema = schema.$ref ? resolveSchema(rootSchema, schema.$ref, rootSchema) : schema;
    return hasType(resolvedSchema, 'object');
}));
const isObjectArrayControl = and(uiTypeIs('Control'), isObjectArray);
const traverse = (any, pred, rootSchema) => {
    if (isArray(any)) {
        return reduce(any, (acc, el) => acc || traverse(el, pred, rootSchema), false);
    }
    if (pred(any)) {
        return true;
    }
    if (any.$ref) {
        const toTraverse = resolveSchema(rootSchema, any.$ref, rootSchema);
        if (toTraverse && !toTraverse.$ref) {
            return traverse(toTraverse, pred, rootSchema);
        }
    }
    if (any.items) {
        return traverse(any.items, pred, rootSchema);
    }
    if (any.properties) {
        return reduce(toPairs(any.properties), (acc, [_key, val]) => acc || traverse(val, pred, rootSchema), false);
    }
    return false;
};
const isObjectArrayWithNesting = (uischema, schema, context) => {
    if (!uiTypeIs('Control')(uischema, schema, context)) {
        return false;
    }
    const schemaPath = uischema.scope;
    const resolvedSchema = resolveSchema(schema, schemaPath, context?.rootSchema ?? schema);
    let objectDepth = 0;
    if (resolvedSchema !== undefined && resolvedSchema.items !== undefined) {
        if (traverse(resolvedSchema.items, val => {
            if (val === schema) {
                return false;
            }
            if (val.$ref !== undefined) {
                return false;
            }
            if (val.anyOf || val.oneOf) {
                return true;
            }
            if (hasType(val, 'object')) {
                objectDepth++;
                if (objectDepth === 2) {
                    return true;
                }
            }
            if (hasType(val, 'array')) {
                return true;
            }
            return false;
        }, context?.rootSchema)) {
            return true;
        }
        if (uischema.options && uischema.options.detail) {
            if (typeof uischema.options.detail === 'string') {
                return uischema.options.detail.toUpperCase() !== 'DEFAULT';
            }
            else if (typeof uischema.options.detail === 'object' &&
                uischema.options.detail.type) {
                return true;
            }
        }
    }
    return false;
};
const isArrayObjectControl = isObjectArrayControl;
const isPrimitiveArrayControl = and(uiTypeIs('Control'), schemaMatches((schema, rootSchema) => deriveTypes(schema).length !== 0 &&
    !Array.isArray(resolveSchema(schema, 'items', rootSchema))
), schemaSubPathMatches('items', (schema, rootSchema) => {
    const resolvedSchema = schema.$ref ? resolveSchema(rootSchema, schema.$ref, rootSchema) : schema;
    const types = deriveTypes(resolvedSchema);
    return (types.length === 1 &&
        includes(['integer', 'number', 'boolean', 'string'], types[0]));
}));
const isRangeControl = and(uiTypeIs('Control'), or(schemaTypeIs('number'), schemaTypeIs('integer')), schemaMatches(schema => schema.hasOwnProperty('maximum') &&
    schema.hasOwnProperty('minimum') &&
    schema.hasOwnProperty('default')), optionIs('slider', true));
const isNumberFormatControl = and(uiTypeIs('Control'), schemaTypeIs('integer'), optionIs('format', true));
const isCategorization = (category) => category.type === 'Categorization';
const isCategory = (uischema) => uischema.type === 'Category';
const hasCategory = (categorization) => {
    if (isEmpty(categorization.elements)) {
        return false;
    }
    return categorization.elements
        .map(elem => isCategorization(elem) ? hasCategory(elem) : isCategory(elem))
        .reduce((prev, curr) => prev && curr, true);
};
const categorizationHasCategory = (uischema) => hasCategory(uischema);
const not = (tester) => (uischema, schema, context) => !tester(uischema, schema, context);

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  NOT_APPLICABLE: NOT_APPLICABLE,
  isControl: isControl,
  schemaMatches: schemaMatches,
  schemaSubPathMatches: schemaSubPathMatches,
  schemaTypeIs: schemaTypeIs,
  formatIs: formatIs,
  uiTypeIs: uiTypeIs,
  optionIs: optionIs,
  scopeEndsWith: scopeEndsWith,
  scopeEndIs: scopeEndIs,
  and: and,
  or: or,
  rankWith: rankWith,
  withIncreasedRank: withIncreasedRank,
  isBooleanControl: isBooleanControl,
  isObjectControl: isObjectControl,
  isAllOfControl: isAllOfControl,
  isAnyOfControl: isAnyOfControl,
  isOneOfControl: isOneOfControl,
  isEnumControl: isEnumControl,
  isOneOfEnumControl: isOneOfEnumControl,
  isIntegerControl: isIntegerControl,
  isNumberControl: isNumberControl,
  isStringControl: isStringControl,
  isMultiLineControl: isMultiLineControl,
  isDateControl: isDateControl,
  isTimeControl: isTimeControl,
  isDateTimeControl: isDateTimeControl,
  isObjectArray: isObjectArray,
  isObjectArrayControl: isObjectArrayControl,
  isObjectArrayWithNesting: isObjectArrayWithNesting,
  isArrayObjectControl: isArrayObjectControl,
  isPrimitiveArrayControl: isPrimitiveArrayControl,
  isRangeControl: isRangeControl,
  isNumberFormatControl: isNumberFormatControl,
  isCategorization: isCategorization,
  isCategory: isCategory,
  hasCategory: hasCategory,
  categorizationHasCategory: categorizationHasCategory,
  not: not
});

const uischemaRegistryReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_UI_SCHEMA:
            return state
                .slice()
                .concat({ tester: action.tester, uischema: action.uischema });
        case REMOVE_UI_SCHEMA:
            const copy = state.slice();
            remove(copy, entry => entry.tester === action.tester);
            return copy;
        default:
            return state;
    }
};
const findMatchingUISchema = (state) => (jsonSchema, schemaPath, path) => {
    const match = maxBy(state, entry => entry.tester(jsonSchema, schemaPath, path));
    if (match !== undefined &&
        match.tester(jsonSchema, schemaPath, path) !== NOT_APPLICABLE) {
        return match.uischema;
    }
    return undefined;
};

const jsonFormsReducerConfig = {
    core: coreReducer,
    renderers: rendererReducer,
    cells: cellReducer,
    config: configReducer,
    uischemas: uischemaRegistryReducer,
    defaultData: defaultDataReducer,
    i18n: i18nReducer,
};
const findUISchema = (uischemas, schema, schemaPath, path, fallback = 'VerticalLayout', control, rootSchema) => {
    if (control && control.options && control.options.detail) {
        if (typeof control.options.detail === 'string') {
            if (control.options.detail.toUpperCase() === 'GENERATE') {
                if (typeof fallback === "function") {
                    return fallback();
                }
                return Generate.uiSchema(schema, fallback);
            }
        }
        else if (typeof control.options.detail === 'object') {
            if (control.options.detail.type &&
                typeof control.options.detail.type === 'string') {
                return control.options.detail;
            }
        }
    }
    const uiSchema = findMatchingUISchema(uischemas)(schema, schemaPath, path);
    if (uiSchema === undefined) {
        if (typeof fallback === 'function') {
            return fallback();
        }
        return Generate.uiSchema(schema, fallback, '#', rootSchema);
    }
    return uiSchema;
};
const getErrorAt = (instancePath, schema) => (state) => {
    return errorAt(instancePath, schema)(state.jsonforms.core);
};
const getSubErrorsAt = (instancePath, schema) => (state) => subErrorsAt(instancePath, schema)(state.jsonforms.core);
const getConfig = (state) => state.jsonforms.config;
const getLocale = (state) => fetchLocale(get(state, 'jsonforms.i18n'));
const getTranslator = () => (state) => fetchTranslator(get(state, 'jsonforms.i18n'));
const getErrorTranslator = () => (state) => fetchErrorTranslator(get(state, 'jsonforms.i18n'));

const getData = (state) => extractData(get(state, 'jsonforms.core'));
const getSchema = (state) => extractSchema(get(state, 'jsonforms.core'));
const getUiSchema = (state) => extractUiSchema(get(state, 'jsonforms.core'));
const getAjv = (state) => extractAjv(get(state, 'jsonforms.core'));
const getDefaultData = (state) => extractDefaultData(get(state, 'jsonforms.defaultData'));
const getRenderers = (state) => get(state, 'jsonforms.renderers');
const getCells = (state) => get(state, 'jsonforms.cells');
const getUISchemas = (state) => get(state, 'jsonforms.uischemas');

const compose = (path1, path2) => {
    let p1 = path1;
    if (!isEmpty(path1) && !isEmpty(path2) && !path2.startsWith('[')) {
        p1 = path1 + '.';
    }
    if (isEmpty(p1)) {
        return path2;
    }
    else if (isEmpty(path2)) {
        return p1;
    }
    else {
        return `${p1}${path2}`;
    }
};
const toDataPathSegments = (schemaPath) => {
    const s = schemaPath
        .replace(/(anyOf|allOf|oneOf)\/[\d]\//g, '')
        .replace(/(then|else)\//g, '');
    const segments = s.split('/');
    const decodedSegments = segments.map(decode);
    const startFromRoot = decodedSegments[0] === '#' || decodedSegments[0] === '';
    const startIndex = startFromRoot ? 2 : 1;
    return range(startIndex, decodedSegments.length, 2).map(idx => decodedSegments[idx]);
};
const toDataPath = (schemaPath) => {
    return toDataPathSegments(schemaPath).join('.');
};
const composeWithUi = (scopableUi, path) => {
    if (!isScoped(scopableUi)) {
        return path ?? '';
    }
    const segments = toDataPathSegments(scopableUi.scope);
    if (isEmpty(segments)) {
        return path ?? '';
    }
    return compose(path, segments.join('.'));
};
const encode = (segment) => segment?.replace(/~/g, '~0').replace(/\//g, '~1');
const decode = (pointerSegment) => pointerSegment?.replace(/~1/g, '/').replace(/~0/, '~');

const isObjectSchema = (schema) => {
    return schema.properties !== undefined;
};
const isArraySchema = (schema) => {
    return schema.type === 'array' && schema.items !== undefined;
};
const resolveData = (instance, dataPath) => {
    if (isEmpty(dataPath)) {
        return instance;
    }
    const dataPathSegments = dataPath.split('.');
    return dataPathSegments
        .map(segment => decodeURIComponent(segment))
        .reduce((curInstance, decodedSegment) => {
        if (!curInstance || !curInstance.hasOwnProperty(decodedSegment)) {
            return undefined;
        }
        return curInstance[decodedSegment];
    }, instance);
};
const findAllRefs = (schema, result = {}, resolveTuples = false) => {
    if (isObjectSchema(schema)) {
        Object.keys(schema.properties).forEach(key => findAllRefs(schema.properties[key], result));
    }
    if (isArraySchema(schema)) {
        if (Array.isArray(schema.items)) {
            if (resolveTuples) {
                const items = schema.items;
                items.forEach(child => findAllRefs(child, result));
            }
        }
        else {
            findAllRefs(schema.items, result);
        }
    }
    if (Array.isArray(schema.anyOf)) {
        const anyOf = schema.anyOf;
        anyOf.forEach(child => findAllRefs(child, result));
    }
    if (schema.$ref !== undefined) {
        result[schema.$ref] = schema;
    }
    return result;
};
const invalidSegment = (pathSegment) => pathSegment === '#' || pathSegment === undefined || pathSegment === '';
const resolveSchema = (schema, schemaPath, rootSchema) => {
    const segments = schemaPath?.split('/').map(decode);
    return resolveSchemaWithSegments(schema, segments, rootSchema);
};
const resolveSchemaWithSegments = (schema, pathSegments, rootSchema) => {
    if (isEmpty(schema)) {
        return undefined;
    }
    if (schema.$ref) {
        schema = resolveSchema(rootSchema, schema.$ref, rootSchema);
    }
    if (!pathSegments || pathSegments.length === 0) {
        return schema;
    }
    const [segment, ...remainingSegments] = pathSegments;
    if (invalidSegment(segment)) {
        return resolveSchemaWithSegments(schema, remainingSegments, rootSchema);
    }
    const singleSegmentResolveSchema = get(schema, segment);
    const resolvedSchema = resolveSchemaWithSegments(singleSegmentResolveSchema, remainingSegments, rootSchema);
    if (resolvedSchema) {
        return resolvedSchema;
    }
    if (segment === 'properties' || segment === 'items') {
        let alternativeResolveResult = undefined;
        const subSchemas = [].concat(schema.oneOf ?? [], schema.allOf ?? [], schema.anyOf ?? [], schema.then ?? [], schema.else ?? []);
        for (const subSchema of subSchemas) {
            alternativeResolveResult = resolveSchemaWithSegments(subSchema, [segment, ...remainingSegments], rootSchema);
            if (alternativeResolveResult) {
                break;
            }
        }
        return alternativeResolveResult;
    }
    return undefined;
};

const isOrCondition = (condition) => condition.type === 'OR';
const isAndCondition = (condition) => condition.type === 'AND';
const isLeafCondition = (condition) => condition.type === 'LEAF';
const isSchemaCondition = (condition) => has(condition, 'schema');
const getConditionScope = (condition, path) => {
    return composeWithUi(condition, path);
};
const evaluateCondition = (data, condition, path, ajv) => {
    if (isAndCondition(condition)) {
        return condition.conditions.reduce((acc, cur) => acc && evaluateCondition(data, cur, path, ajv), true);
    }
    else if (isOrCondition(condition)) {
        return condition.conditions.reduce((acc, cur) => acc || evaluateCondition(data, cur, path, ajv), false);
    }
    else if (isLeafCondition(condition)) {
        const value = resolveData(data, getConditionScope(condition, path));
        return value === condition.expectedValue;
    }
    else if (isSchemaCondition(condition)) {
        const value = resolveData(data, getConditionScope(condition, path));
        return ajv.validate(condition.schema, value);
    }
    else {
        return true;
    }
};
const isRuleFulfilled = (uischema, data, path, ajv) => {
    const condition = uischema.rule.condition;
    return evaluateCondition(data, condition, path, ajv);
};
const evalVisibility = (uischema, data, path = undefined, ajv) => {
    const fulfilled = isRuleFulfilled(uischema, data, path, ajv);
    switch (uischema.rule.effect) {
        case RuleEffect.HIDE:
            return !fulfilled;
        case RuleEffect.SHOW:
            return fulfilled;
        default:
            return true;
    }
};
const evalEnablement = (uischema, data, path = undefined, ajv) => {
    const fulfilled = isRuleFulfilled(uischema, data, path, ajv);
    switch (uischema.rule.effect) {
        case RuleEffect.DISABLE:
            return !fulfilled;
        case RuleEffect.ENABLE:
            return fulfilled;
        default:
            return true;
    }
};
const hasShowRule = (uischema) => {
    if (uischema.rule &&
        (uischema.rule.effect === RuleEffect.SHOW ||
            uischema.rule.effect === RuleEffect.HIDE)) {
        return true;
    }
    return false;
};
const hasEnableRule = (uischema) => {
    if (uischema.rule &&
        (uischema.rule.effect === RuleEffect.ENABLE ||
            uischema.rule.effect === RuleEffect.DISABLE)) {
        return true;
    }
    return false;
};
const isVisible = (uischema, data, path = undefined, ajv) => {
    if (uischema.rule) {
        return evalVisibility(uischema, data, path, ajv);
    }
    return true;
};
const isEnabled = (uischema, data, path = undefined, ajv) => {
    if (uischema.rule) {
        return evalEnablement(uischema, data, path, ajv);
    }
    return true;
};
const isInherentlyEnabled = (state, ownProps, uischema, schema, rootData, config) => {
    if (state?.jsonforms?.readonly) {
        return false;
    }
    if (uischema && hasEnableRule(uischema)) {
        return isEnabled(uischema, rootData, ownProps?.path, getAjv(state));
    }
    if (typeof uischema?.options?.readonly === 'boolean') {
        return !uischema.options.readonly;
    }
    if (typeof uischema?.options?.readOnly === 'boolean') {
        return !uischema.options.readOnly;
    }
    if (typeof config?.readonly === 'boolean') {
        return !config.readonly;
    }
    if (typeof config?.readOnly === 'boolean') {
        return !config.readOnly;
    }
    if (schema?.readOnly === true) {
        return false;
    }
    if (typeof ownProps?.enabled === 'boolean') {
        return ownProps.enabled;
    }
    return true;
};

const convertToValidClassName = (s) => s.replace('#', 'root').replace(new RegExp('/', 'g'), '_');
const formatErrorMessage = (errors) => {
    if (errors === undefined || errors === null) {
        return '';
    }
    return errors.join('\n');
};
const hasType = (jsonSchema, expected) => {
    return includes(deriveTypes(jsonSchema), expected);
};
const deriveTypes = (jsonSchema) => {
    if (isEmpty(jsonSchema)) {
        return [];
    }
    if (!isEmpty(jsonSchema.type) && typeof jsonSchema.type === 'string') {
        return [jsonSchema.type];
    }
    if (isArray(jsonSchema.type)) {
        return jsonSchema.type;
    }
    if (!isEmpty(jsonSchema.properties) ||
        !isEmpty(jsonSchema.additionalProperties)) {
        return ['object'];
    }
    if (!isEmpty(jsonSchema.items)) {
        return ['array'];
    }
    if (!isEmpty(jsonSchema.allOf)) {
        const allOfType = find(jsonSchema.allOf, (schema) => deriveTypes(schema).length !== 0);
        if (allOfType) {
            return deriveTypes(allOfType);
        }
    }
    return [];
};
const Resolve = {
    schema: resolveSchema,
    data: resolveData
};
const fromScoped = (scopable) => toDataPathSegments(scopable.scope).join('.');
const Paths = {
    compose: compose,
    fromScoped
};
const Runtime = {
    isEnabled(uischema, data, ajv) {
        return isEnabled(uischema, data, undefined, ajv);
    },
    isVisible(uischema, data, ajv) {
        return isVisible(uischema, data, undefined, ajv);
    }
};

const deriveLabel = (controlElement, schemaElement) => {
    if (schemaElement && typeof schemaElement.title === 'string') {
        return schemaElement.title;
    }
    if (typeof controlElement.scope === 'string') {
        const ref = controlElement.scope;
        const label = decode(ref.substr(ref.lastIndexOf('/') + 1));
        return startCase(label);
    }
    return '';
};
const createCleanLabel = (label) => {
    return startCase(label.replace('_', ' '));
};
const createLabelDescriptionFrom = (withLabel, schema) => {
    const labelProperty = withLabel.label;
    if (typeof labelProperty === 'boolean') {
        return labelDescription(deriveLabel(withLabel, schema), labelProperty);
    }
    if (typeof labelProperty === 'string') {
        return labelDescription(labelProperty, true);
    }
    if (typeof labelProperty === 'object') {
        const label = typeof labelProperty.text === 'string'
            ? labelProperty.text
            : deriveLabel(withLabel, schema);
        const show = typeof labelProperty.show === 'boolean' ? labelProperty.show : true;
        return labelDescription(label, show);
    }
    return labelDescription(deriveLabel(withLabel, schema), true);
};
const labelDescription = (text, show) => ({
    text: text,
    show: show
});

const isRequired = (schema, schemaPath, rootSchema) => {
    const pathSegments = schemaPath.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const nextHigherSchemaSegments = pathSegments.slice(0, pathSegments.length - 2);
    const nextHigherSchemaPath = nextHigherSchemaSegments.join('/');
    const nextHigherSchema = Resolve.schema(schema, nextHigherSchemaPath, rootSchema);
    return (nextHigherSchema !== undefined &&
        nextHigherSchema.required !== undefined &&
        nextHigherSchema.required.indexOf(lastSegment) !== -1);
};
const computeLabel = (label, required, hideRequiredAsterisk) => {
    return `${label ?? ''}${required && !hideRequiredAsterisk ? '*' : ''}`;
};
const showAsRequired = (required, hideRequiredAsterisk) => {
    return required && !hideRequiredAsterisk;
};
const createDefaultValue = (schema) => {
    switch (schema.type) {
        case 'string':
            if (schema.format === 'date-time' ||
                schema.format === 'date' ||
                schema.format === 'time') {
                return new Date();
            }
            return '';
        case 'integer':
        case 'number':
            return 0;
        case 'boolean':
            return false;
        case 'array':
            return [];
        case 'null':
            return null;
        default:
            return {};
    }
};
const isDescriptionHidden = (visible, description, isFocused, showUnfocusedDescription) => {
    return (description === undefined ||
        (description !== undefined && !visible) ||
        (!showUnfocusedDescription && !isFocused));
};
const enumToEnumOptionMapper = (e, t, i18nKey) => {
    let label = typeof e === 'string' ? e : JSON.stringify(e);
    if (t) {
        if (i18nKey) {
            label = t(`${i18nKey}.${label}`, label);
        }
        else {
            label = t(label, label);
        }
    }
    return { label, value: e };
};
const oneOfToEnumOptionMapper = (e, t, fallbackI18nKey) => {
    let label = e.title ??
        (typeof e.const === 'string' ? e.const : JSON.stringify(e.const));
    if (t) {
        if (e.i18n) {
            label = t(e.i18n, label);
        }
        else if (fallbackI18nKey) {
            label = t(`${fallbackI18nKey}.${label}`, label);
        }
        else {
            label = t(label, label);
        }
    }
    return {
        label,
        value: e.const,
    };
};
const mapStateToControlProps = (state, ownProps) => {
    const { uischema } = ownProps;
    const rootData = getData(state);
    const path = composeWithUi(uischema, ownProps.path);
    const visible = ownProps.visible === undefined || hasShowRule(uischema)
        ? isVisible(uischema, rootData, ownProps.path, getAjv(state))
        : ownProps.visible;
    const controlElement = uischema;
    const id = ownProps.id;
    const rootSchema = getSchema(state);
    const required = controlElement.scope !== undefined &&
        isRequired(ownProps.schema, controlElement.scope, rootSchema);
    const resolvedSchema = Resolve.schema(ownProps.schema || rootSchema, controlElement.scope, rootSchema);
    const errors = getErrorAt(path, resolvedSchema)(state);
    const description = resolvedSchema !== undefined ? resolvedSchema.description : '';
    const data = Resolve.data(rootData, path);
    const labelDesc = createLabelDescriptionFrom(uischema, resolvedSchema);
    const label = labelDesc.show ? labelDesc.text : '';
    const config = getConfig(state);
    const enabled = isInherentlyEnabled(state, ownProps, uischema, resolvedSchema || rootSchema, rootData, config);
    const schema = resolvedSchema ?? rootSchema;
    const t = getTranslator()(state);
    const te = getErrorTranslator()(state);
    const i18nLabel = t(getI18nKey(schema, uischema, path, 'label'), label, { schema, uischema, path, errors });
    const i18nDescription = t(getI18nKey(schema, uischema, path, 'description'), description, { schema, uischema, path, errors });
    const i18nErrorMessage = getCombinedErrorMessage(errors, te, t, schema, uischema, path);
    return {
        data,
        description: i18nDescription,
        errors: i18nErrorMessage,
        label: i18nLabel,
        visible,
        enabled,
        id,
        path,
        required,
        uischema,
        schema,
        config: getConfig(state),
        cells: ownProps.cells || state.jsonforms.cells,
        rootSchema
    };
};
const mapDispatchToControlProps = (dispatch) => ({
    handleChange(path, value) {
        dispatch(update(path, () => value));
    }
});
const mapStateToEnumControlProps = (state, ownProps) => {
    const props = mapStateToControlProps(state, ownProps);
    const options = ownProps.options ||
        props.schema.enum?.map(e => enumToEnumOptionMapper(e, getTranslator()(state), getI18nKeyPrefix(props.schema, props.uischema, props.path))) ||
        (props.schema.const && [
            enumToEnumOptionMapper(props.schema.const, getTranslator()(state), getI18nKeyPrefix(props.schema, props.uischema, props.path))
        ]);
    return {
        ...props,
        options
    };
};
const mapStateToOneOfEnumControlProps = (state, ownProps) => {
    const props = mapStateToControlProps(state, ownProps);
    const options = ownProps.options ||
        props.schema.oneOf?.map(oneOfSubSchema => oneOfToEnumOptionMapper(oneOfSubSchema, getTranslator()(state), getI18nKeyPrefix(props.schema, props.uischema, props.path)));
    return {
        ...props,
        options
    };
};
const mapStateToMultiEnumControlProps = (state, ownProps) => {
    const props = mapStateToControlProps(state, ownProps);
    const items = props.schema.items;
    const options = ownProps.options ||
        (items?.oneOf &&
            items.oneOf.map(oneOfSubSchema => oneOfToEnumOptionMapper(oneOfSubSchema, state.jsonforms.i18n?.translate, getI18nKeyPrefix(props.schema, props.uischema, props.path)))) ||
        items?.enum?.map(e => enumToEnumOptionMapper(e, state.jsonforms.i18n?.translate, getI18nKeyPrefix(props.schema, props.uischema, props.path)));
    return {
        ...props,
        options
    };
};
const mapStateToMasterListItemProps = (state, ownProps) => {
    const { schema, path, index } = ownProps;
    const firstPrimitiveProp = schema.properties
        ? find(Object.keys(schema.properties), propName => {
            const prop = schema.properties[propName];
            return (prop.type === 'string' ||
                prop.type === 'number' ||
                prop.type === 'integer');
        })
        : undefined;
    const childPath = compose(path, `${index}`);
    const childData = Resolve.data(getData(state), childPath);
    const childLabel = firstPrimitiveProp ? childData[firstPrimitiveProp] : '';
    return {
        ...ownProps,
        childLabel
    };
};
const mapStateToControlWithDetailProps = (state, ownProps) => {
    const { ...props } = mapStateToControlProps(state, ownProps);
    return {
        ...props,
        uischemas: state.jsonforms.uischemas
    };
};
const mapStateToArrayControlProps = (state, ownProps) => {
    const { path, schema, uischema, ...props } = mapStateToControlWithDetailProps(state, ownProps);
    const resolvedSchema = Resolve.schema(schema, 'items', props.rootSchema);
    const childErrors = getSubErrorsAt(path, resolvedSchema)(state);
    return {
        ...props,
        path,
        uischema,
        schema: resolvedSchema,
        childErrors,
        renderers: ownProps.renderers || getRenderers(state),
        cells: ownProps.cells || getCells(state)
    };
};
const mapDispatchToArrayControlProps = (dispatch) => ({
    addItem: (path, value) => () => {
        dispatch(update(path, array => {
            if (array === undefined || array === null) {
                return [value];
            }
            array.push(value);
            return array;
        }));
    },
    removeItems: (path, toDelete) => () => {
        dispatch(update(path, array => {
            toDelete
                .sort()
                .reverse()
                .forEach(s => array.splice(s, 1));
            return array;
        }));
    },
    moveUp: (path, toMove) => () => {
        dispatch(update(path, array => {
            moveUp(array, toMove);
            return array;
        }));
    },
    moveDown: (path, toMove) => () => {
        dispatch(update(path, array => {
            moveDown(array, toMove);
            return array;
        }));
    }
});
const mapDispatchToMultiEnumProps = (dispatch) => ({
    addItem: (path, value) => {
        dispatch(update(path, data => {
            if (data === undefined || data === null) {
                return [value];
            }
            data.push(value);
            return data;
        }));
    },
    removeItem: (path, toDelete) => {
        dispatch(update(path, data => {
            const indexInData = data.indexOf(toDelete);
            data.splice(indexInData, 1);
            return data;
        }));
    }
});
const layoutDefaultProps = {
    visible: true,
    enabled: true,
    path: '',
    direction: 'column'
};
const getDirection = (uischema) => {
    if (uischema.type === 'HorizontalLayout') {
        return 'row';
    }
    if (uischema.type === 'VerticalLayout') {
        return 'column';
    }
    return layoutDefaultProps.direction;
};
const mapStateToLayoutProps = (state, ownProps) => {
    const rootData = getData(state);
    const { uischema } = ownProps;
    const visible = ownProps.visible === undefined || hasShowRule(uischema)
        ? isVisible(ownProps.uischema, rootData, ownProps.path, getAjv(state))
        : ownProps.visible;
    const data = Resolve.data(rootData, ownProps.path);
    const config = getConfig(state);
    const enabled = isInherentlyEnabled(state, ownProps, uischema, undefined,
    rootData, config);
    const t = getTranslator()(state);
    const label = isLabelable(uischema) ? deriveLabelForUISchemaElement(uischema, t) : undefined;
    return {
        ...layoutDefaultProps,
        renderers: ownProps.renderers || getRenderers(state),
        cells: ownProps.cells || getCells(state),
        visible,
        enabled,
        path: ownProps.path,
        data,
        uischema: ownProps.uischema,
        schema: ownProps.schema,
        direction: ownProps.direction ?? getDirection(uischema),
        config,
        label
    };
};
const mapStateToJsonFormsRendererProps = (state, ownProps) => {
    return {
        renderers: ownProps.renderers || get(state.jsonforms, 'renderers'),
        cells: ownProps.cells || get(state.jsonforms, 'cells'),
        schema: ownProps.schema || getSchema(state),
        rootSchema: getSchema(state),
        uischema: ownProps.uischema || getUiSchema(state),
        path: ownProps.path,
        enabled: ownProps.enabled,
        config: getConfig(state)
    };
};
const controlDefaultProps = {
    ...layoutDefaultProps,
    errors: []
};
const mapStateToCombinatorRendererProps = (state, ownProps, keyword) => {
    const { data, schema, rootSchema, ...props } = mapStateToControlProps(state, ownProps);
    const ajv = state.jsonforms.core.ajv;
    const structuralKeywords = [
        'required',
        'additionalProperties',
        'type',
        'enum',
        'const'
    ];
    const dataIsValid = (errors) => {
        return (!errors ||
            errors.length === 0 ||
            !errors.find(e => structuralKeywords.indexOf(e.keyword) !== -1));
    };
    let indexOfFittingSchema;
    for (let i = 0; i < schema[keyword]?.length; i++) {
        try {
            let _schema = schema[keyword][i];
            if (_schema.$ref) {
                _schema = Resolve.schema(rootSchema, _schema.$ref, rootSchema);
            }
            const valFn = ajv.compile(_schema);
            valFn(data);
            if (dataIsValid(valFn.errors)) {
                indexOfFittingSchema = i;
                break;
            }
        }
        catch (error) {
            console.debug("Combinator subschema is not self contained, can't hand it over to AJV");
        }
    }
    return {
        data,
        schema,
        rootSchema,
        ...props,
        indexOfFittingSchema,
        uischemas: getUISchemas(state)
    };
};
const mapStateToAllOfProps = (state, ownProps) => mapStateToCombinatorRendererProps(state, ownProps, 'allOf');
const mapStateToAnyOfProps = (state, ownProps) => {
    return mapStateToCombinatorRendererProps(state, ownProps, 'anyOf');
};
const mapStateToOneOfProps = (state, ownProps) => {
    return mapStateToCombinatorRendererProps(state, ownProps, 'oneOf');
};
const mapStateToArrayLayoutProps = (state, ownProps) => {
    const { path, schema, uischema, errors, ...props } = mapStateToControlWithDetailProps(state, ownProps);
    const resolvedSchema = Resolve.schema(schema, 'items', props.rootSchema);
    const childErrors = getCombinedErrorMessage(getSubErrorsAt(path, resolvedSchema)(state), getErrorTranslator()(state), getTranslator()(state), undefined, undefined, undefined);
    const allErrors = errors +
        (errors.length > 0 && childErrors.length > 0 ? '\n' : '') +
        childErrors;
    return {
        ...props,
        path,
        uischema,
        schema: resolvedSchema,
        data: props.data ? props.data.length : 0,
        errors: allErrors,
        minItems: schema.minItems
    };
};
const mapStateToLabelProps = (state, props) => {
    const { uischema } = props;
    const visible = props.visible === undefined || hasShowRule(uischema)
        ? isVisible(props.uischema, getData(state), props.path, getAjv(state))
        : props.visible;
    const text = uischema.text;
    const t = getTranslator()(state);
    const i18nKeyPrefix = getI18nKeyPrefixBySchema(undefined, uischema);
    const i18nKey = i18nKeyPrefix ? `${i18nKeyPrefix}.text` : text ?? '';
    const i18nText = t(i18nKey, text, { uischema });
    return {
        text: i18nText,
        visible,
        config: getConfig(state),
        renderers: props.renderers || getRenderers(state),
        cells: props.cells || getCells(state),
    };
};

const mapStateToCellProps = (state, ownProps) => {
    const { id, schema, path, uischema, renderers, cells } = ownProps;
    const rootData = getData(state);
    const visible = ownProps.visible !== undefined
        ? ownProps.visible
        : isVisible(uischema, rootData, undefined, getAjv(state));
    const rootSchema = getSchema(state);
    const config = getConfig(state);
    let enabled;
    if (state.jsonforms.readonly === true) {
        enabled = false;
    }
    else if (typeof ownProps.enabled === 'boolean') {
        enabled = ownProps.enabled;
    }
    else {
        enabled = isInherentlyEnabled(state, ownProps, uischema, schema || rootSchema, rootData, config);
    }
    const errors = formatErrorMessage(union(getErrorAt(path, schema)(state).map(error => error.message)));
    const isValid = isEmpty(errors);
    return {
        data: Resolve.data(rootData, path),
        visible,
        enabled,
        id,
        path,
        errors,
        isValid,
        schema,
        uischema,
        config: getConfig(state),
        rootSchema,
        renderers,
        cells
    };
};
const mapStateToDispatchCellProps = (state, ownProps) => {
    const props = mapStateToCellProps(state, ownProps);
    const { renderers, cells, ...otherOwnProps } = ownProps;
    return {
        ...props,
        ...otherOwnProps,
        cells: cells || state.jsonforms.cells || []
    };
};
const defaultMapStateToEnumCellProps = (state, ownProps) => {
    const props = mapStateToCellProps(state, ownProps);
    const options = ownProps.options ||
        props.schema.enum?.map(e => enumToEnumOptionMapper(e, getTranslator()(state), getI18nKeyPrefix(props.schema, props.uischema, props.path))) ||
        (props.schema.const && [
            enumToEnumOptionMapper(props.schema.const, getTranslator()(state), getI18nKeyPrefix(props.schema, props.uischema, props.path))
        ]);
    return {
        ...props,
        options
    };
};
const mapStateToOneOfEnumCellProps = (state, ownProps) => {
    const props = mapStateToCellProps(state, ownProps);
    const options = ownProps.options ||
        props.schema.oneOf?.map(oneOfSubSchema => oneOfToEnumOptionMapper(oneOfSubSchema, getTranslator()(state), getI18nKeyPrefix(props.schema, props.uischema, props.path)));
    return {
        ...props,
        options
    };
};
const mapDispatchToCellProps = mapDispatchToControlProps;
const defaultMapDispatchToControlProps =
(dispatch, ownProps) => {
    const { handleChange } = mapDispatchToCellProps(dispatch);
    return {
        handleChange: ownProps.handleChange || handleChange
    };
};

const createLabel = (subSchema, subSchemaIndex, keyword) => {
    if (subSchema.title) {
        return subSchema.title;
    }
    else {
        return keyword + '-' + subSchemaIndex;
    }
};
const createCombinatorRenderInfos = (combinatorSubSchemas, rootSchema, keyword, control, path, uischemas) => combinatorSubSchemas.map((subSchema, subSchemaIndex) => {
    const schema = subSchema.$ref ? Resolve.schema(rootSchema, subSchema.$ref, rootSchema) : subSchema;
    return {
        schema,
        uischema: findUISchema(uischemas, schema, control.scope, path, undefined, control, rootSchema),
        label: createLabel(subSchema, subSchemaIndex, keyword)
    };
});

const usedIds = new Set();
const makeId = (idBase, iteration) => iteration <= 1 ? idBase : idBase + iteration.toString();
const isUniqueId = (idBase, iteration) => {
    const newID = makeId(idBase, iteration);
    return !usedIds.has(newID);
};
const createId = (proposedId) => {
    if (proposedId === undefined) {
        proposedId = 'undefined';
    }
    let tries = 0;
    while (!isUniqueId(proposedId, tries)) {
        tries++;
    }
    const newID = makeId(proposedId, tries);
    usedIds.add(newID);
    return newID;
};
const removeId = (id) => usedIds.delete(id);
const clearAllIds = () => usedIds.clear();

const getFirstPrimitiveProp = (schema) => {
    if (schema.properties) {
        return find(Object.keys(schema.properties), propName => {
            const prop = schema.properties[propName];
            return (prop.type === 'string' ||
                prop.type === 'number' ||
                prop.type === 'integer');
        });
    }
    return undefined;
};

const setReadonlyPropertyValue = (value) => (child) => {
    if (!child.options) {
        child.options = {};
    }
    child.options.readonly = value;
};
const setReadonly = (uischema) => {
    iterateSchema(uischema, setReadonlyPropertyValue(true));
};
const unsetReadonly = (uischema) => {
    iterateSchema(uischema, setReadonlyPropertyValue(false));
};
const iterateSchema = (uischema, toApply) => {
    if (isEmpty(uischema)) {
        return;
    }
    if (isLayout(uischema)) {
        uischema.elements.forEach(child => iterateSchema(child, toApply));
        return;
    }
    toApply(uischema);
};

const createAjv = (options) => {
    const ajv = new Ajv({
        allErrors: true,
        verbose: true,
        strict: false,
        ...options
    });
    addFormats(ajv);
    return ajv;
};

const createLayout = (layoutType) => ({
    type: layoutType,
    elements: []
});
const createControlElement = (ref) => ({
    type: 'Control',
    scope: ref
});
const wrapInLayoutIfNecessary = (uischema, layoutType) => {
    if (!isEmpty(uischema) && !isLayout(uischema)) {
        const verticalLayout = createLayout(layoutType);
        verticalLayout.elements.push(uischema);
        return verticalLayout;
    }
    return uischema;
};
const addLabel = (layout, labelName) => {
    if (!isEmpty(labelName)) {
        const fixedLabel = startCase(labelName);
        if (isGroup(layout)) {
            layout.label = fixedLabel;
        }
        else {
            const label = {
                type: 'Label',
                text: fixedLabel
            };
            layout.elements.push(label);
        }
    }
};
const isCombinator = (jsonSchema) => {
    return (!isEmpty(jsonSchema) &&
        (!isEmpty(jsonSchema.oneOf) ||
            !isEmpty(jsonSchema.anyOf) ||
            !isEmpty(jsonSchema.allOf)));
};
const generateUISchema = (jsonSchema, schemaElements, currentRef, schemaName, layoutType, rootSchema) => {
    if (!isEmpty(jsonSchema) && jsonSchema.$ref !== undefined) {
        return generateUISchema(resolveSchema(rootSchema, jsonSchema.$ref, rootSchema), schemaElements, currentRef, schemaName, layoutType, rootSchema);
    }
    if (isCombinator(jsonSchema)) {
        const controlObject = createControlElement(currentRef);
        schemaElements.push(controlObject);
        return controlObject;
    }
    const types = deriveTypes(jsonSchema);
    if (types.length === 0) {
        return null;
    }
    if (types.length > 1) {
        const controlObject = createControlElement(currentRef);
        schemaElements.push(controlObject);
        return controlObject;
    }
    if (currentRef === '#' && types[0] === 'object') {
        const layout = createLayout(layoutType);
        schemaElements.push(layout);
        if (jsonSchema.properties && keys(jsonSchema.properties).length > 1) {
            addLabel(layout, schemaName);
        }
        if (!isEmpty(jsonSchema.properties)) {
            const nextRef = currentRef + '/properties';
            Object.keys(jsonSchema.properties).map(propName => {
                let value = jsonSchema.properties[propName];
                const ref = `${nextRef}/${encode(propName)}`;
                if (value.$ref !== undefined) {
                    value = resolveSchema(rootSchema, value.$ref, rootSchema);
                }
                generateUISchema(value, layout.elements, ref, propName, layoutType, rootSchema);
            });
        }
        return layout;
    }
    switch (types[0]) {
        case 'object':
        case 'array':
        case 'string':
        case 'number':
        case 'integer':
        case 'boolean':
            const controlObject = createControlElement(currentRef);
            schemaElements.push(controlObject);
            return controlObject;
        default:
            throw new Error('Unknown type: ' + JSON.stringify(jsonSchema));
    }
};
const generateDefaultUISchema = (jsonSchema, layoutType = 'VerticalLayout', prefix = '#', rootSchema = jsonSchema) => wrapInLayoutIfNecessary(generateUISchema(jsonSchema, [], prefix, '', layoutType, rootSchema), layoutType);

const Generate = {
    jsonSchema: generateJsonSchema,
    uiSchema: generateDefaultUISchema,
    controlElement: createControlElement
};

const INIT = 'jsonforms/INIT';
const UPDATE_CORE = `jsonforms/UPDATE_CORE`;
const SET_AJV = 'jsonforms/SET_AJV';
const UPDATE_DATA = 'jsonforms/UPDATE';
const UPDATE_ERRORS = 'jsonforms/UPDATE_ERRORS';
const VALIDATE = 'jsonforms/VALIDATE';
const ADD_RENDERER = 'jsonforms/ADD_RENDERER';
const REMOVE_RENDERER = 'jsonforms/REMOVE_RENDERER';
const ADD_CELL = 'jsonforms/ADD_CELL';
const REMOVE_CELL = 'jsonforms/REMOVE_CELL';
const SET_CONFIG = 'jsonforms/SET_CONFIG';
const ADD_UI_SCHEMA = `jsonforms/ADD_UI_SCHEMA`;
const REMOVE_UI_SCHEMA = `jsonforms/REMOVE_UI_SCHEMA`;
const SET_SCHEMA = `jsonforms/SET_SCHEMA`;
const SET_UISCHEMA = `jsonforms/SET_UISCHEMA`;
const SET_VALIDATION_MODE = 'jsonforms/SET_VALIDATION_MODE';
const SET_LOCALE = `jsonforms/SET_LOCALE`;
const SET_TRANSLATOR = 'jsonforms/SET_TRANSLATOR';
const UPDATE_I18N = 'jsonforms/UPDATE_I18N';
const ADD_DEFAULT_DATA = `jsonforms/ADD_DEFAULT_DATA`;
const REMOVE_DEFAULT_DATA = `jsonforms/REMOVE_DEFAULT_DATA`;
const init = (data, schema = generateJsonSchema(data), uischema, options) => ({
    type: INIT,
    data,
    schema,
    uischema: typeof uischema === 'object' ? uischema : generateDefaultUISchema(schema),
    options
});
const updateCore = (data, schema, uischema, options) => ({
    type: UPDATE_CORE,
    data,
    schema,
    uischema,
    options
});
const registerDefaultData = (schemaPath, data) => ({
    type: ADD_DEFAULT_DATA,
    schemaPath,
    data
});
const unregisterDefaultData = (schemaPath) => ({
    type: REMOVE_DEFAULT_DATA,
    schemaPath
});
const setAjv = (ajv) => ({
    type: SET_AJV,
    ajv
});
const update = (path, updater) => ({
    type: UPDATE_DATA,
    path,
    updater
});
const updateErrors = (errors) => ({
    type: UPDATE_ERRORS,
    errors
});
const registerRenderer = (tester, renderer) => ({
    type: ADD_RENDERER,
    tester,
    renderer
});
const registerCell = (tester, cell) => ({
    type: ADD_CELL,
    tester,
    cell
});
const unregisterCell = (tester, cell) => ({
    type: REMOVE_CELL,
    tester,
    cell
});
const unregisterRenderer = (tester, renderer) => ({
    type: REMOVE_RENDERER,
    tester,
    renderer
});
const setConfig = (config) => ({
    type: SET_CONFIG,
    config
});
const setValidationMode = (validationMode) => ({
    type: SET_VALIDATION_MODE,
    validationMode
});
const registerUISchema = (tester, uischema) => {
    return {
        type: ADD_UI_SCHEMA,
        tester,
        uischema
    };
};
const unregisterUISchema = (tester) => {
    return {
        type: REMOVE_UI_SCHEMA,
        tester
    };
};
const setLocale = (locale) => ({
    type: SET_LOCALE,
    locale
});
const setSchema = (schema) => ({
    type: SET_SCHEMA,
    schema
});
const setTranslator = (translator, errorTranslator) => ({
    type: SET_TRANSLATOR,
    translator,
    errorTranslator
});
const updateI18n = (locale, translator, errorTranslator) => ({
    type: UPDATE_I18N,
    locale,
    translator,
    errorTranslator
});
const setUISchema = (uischema) => ({
    type: SET_UISCHEMA,
    uischema
});

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  INIT: INIT,
  UPDATE_CORE: UPDATE_CORE,
  SET_AJV: SET_AJV,
  UPDATE_DATA: UPDATE_DATA,
  UPDATE_ERRORS: UPDATE_ERRORS,
  VALIDATE: VALIDATE,
  ADD_RENDERER: ADD_RENDERER,
  REMOVE_RENDERER: REMOVE_RENDERER,
  ADD_CELL: ADD_CELL,
  REMOVE_CELL: REMOVE_CELL,
  SET_CONFIG: SET_CONFIG,
  ADD_UI_SCHEMA: ADD_UI_SCHEMA,
  REMOVE_UI_SCHEMA: REMOVE_UI_SCHEMA,
  SET_SCHEMA: SET_SCHEMA,
  SET_UISCHEMA: SET_UISCHEMA,
  SET_VALIDATION_MODE: SET_VALIDATION_MODE,
  SET_LOCALE: SET_LOCALE,
  SET_TRANSLATOR: SET_TRANSLATOR,
  UPDATE_I18N: UPDATE_I18N,
  ADD_DEFAULT_DATA: ADD_DEFAULT_DATA,
  REMOVE_DEFAULT_DATA: REMOVE_DEFAULT_DATA,
  init: init,
  updateCore: updateCore,
  registerDefaultData: registerDefaultData,
  unregisterDefaultData: unregisterDefaultData,
  setAjv: setAjv,
  update: update,
  updateErrors: updateErrors,
  registerRenderer: registerRenderer,
  registerCell: registerCell,
  unregisterCell: unregisterCell,
  unregisterRenderer: unregisterRenderer,
  setConfig: setConfig,
  setValidationMode: setValidationMode,
  registerUISchema: registerUISchema,
  unregisterUISchema: unregisterUISchema,
  setLocale: setLocale,
  setSchema: setSchema,
  setTranslator: setTranslator,
  updateI18n: updateI18n,
  setUISchema: setUISchema
});

const Helpers = {
    createLabelDescriptionFrom,
    convertToValidClassName
};

export { ADD_CELL, ADD_DEFAULT_DATA, ADD_RENDERER, ADD_UI_SCHEMA, index as Actions, Draft4, Generate, Helpers, INIT, NOT_APPLICABLE, Paths, REMOVE_CELL, REMOVE_DEFAULT_DATA, REMOVE_RENDERER, REMOVE_UI_SCHEMA, Resolve, RuleEffect, Runtime, SET_AJV, SET_CONFIG, SET_LOCALE, SET_SCHEMA, SET_TRANSLATOR, SET_UISCHEMA, SET_VALIDATION_MODE, index$1 as Test, UPDATE_CORE, UPDATE_DATA, UPDATE_ERRORS, UPDATE_I18N, VALIDATE, and, categorizationHasCategory, cellReducer, clearAllIds, compose, compose as composePaths, composeWithUi, computeLabel, configReducer, controlDefaultProps, convertToValidClassName, coreReducer, createAjv, createCleanLabel, createCombinatorRenderInfos, createControlElement, createDefaultValue, createId, createLabelDescriptionFrom, decode, defaultDataReducer, defaultErrorTranslator, defaultJsonFormsI18nState, defaultMapDispatchToControlProps, defaultMapStateToEnumCellProps, defaultTranslator, deriveLabelForUISchemaElement, deriveTypes, encode, enumToEnumOptionMapper, errorAt, errorsAt, evalEnablement, evalVisibility, extractAjv, extractData, extractDefaultData, extractSchema, extractUiSchema, fetchErrorTranslator, fetchLocale, fetchTranslator, findAllRefs, findMatchingUISchema, findUISchema, formatErrorMessage, formatIs, generateDefaultUISchema, generateJsonSchema, getAjv, getCells, getCombinedErrorMessage, getConfig, getControlPath, getData, getDefaultData, getErrorAt, getErrorTranslator, getFirstPrimitiveProp, getI18nKey, getI18nKeyPrefix, getI18nKeyPrefixBySchema, getLocale, getRenderers, getSchema, getSubErrorsAt, getTranslator, getUISchemas, getUiSchema, hasCategory, hasEnableRule, hasShowRule, hasType, i18nReducer, init, isAllOfControl, isAnyOfControl, isArrayObjectControl, isBooleanControl, isCategorization, isCategory, isControl, isDateControl, isDateTimeControl, isDescriptionHidden, isEnabled, isEnumControl, isGroup, isInherentlyEnabled, isIntegerControl, isInternationalized, isLabelable, isLabeled, isLayout, isMultiLineControl, isNumberControl, isNumberFormatControl, isObjectArray, isObjectArrayControl, isObjectArrayWithNesting, isObjectControl, isOneOfControl, isOneOfEnumControl, isPrimitiveArrayControl, isRangeControl, isScopable, isScoped, isStringControl, isTimeControl, isVisible, iterateSchema, jsonFormsReducerConfig, layoutDefaultProps, mapDispatchToArrayControlProps, mapDispatchToCellProps, mapDispatchToControlProps, mapDispatchToMultiEnumProps, mapStateToAllOfProps, mapStateToAnyOfProps, mapStateToArrayControlProps, mapStateToArrayLayoutProps, mapStateToCellProps, mapStateToCombinatorRendererProps, mapStateToControlProps, mapStateToControlWithDetailProps, mapStateToDispatchCellProps, mapStateToEnumControlProps, mapStateToJsonFormsRendererProps, mapStateToLabelProps, mapStateToLayoutProps, mapStateToMasterListItemProps, mapStateToMultiEnumControlProps, mapStateToOneOfEnumCellProps, mapStateToOneOfEnumControlProps, mapStateToOneOfProps, moveDown, moveUp, not, oneOfToEnumOptionMapper, optionIs, or, rankWith, registerCell, registerDefaultData, registerRenderer, registerUISchema, removeId, rendererReducer, resolveData, resolveSchema, schemaMatches, schemaSubPathMatches, schemaTypeIs, scopeEndIs, scopeEndsWith, setAjv, setConfig, setLocale, setReadonly, setSchema, setTranslator, setUISchema, setValidationMode, showAsRequired, subErrorsAt, toDataPath, toDataPathSegments, transformPathToI18nPrefix, uiTypeIs, uischemaRegistryReducer, unregisterCell, unregisterDefaultData, unregisterRenderer, unregisterUISchema, unsetReadonly, update, updateCore, updateErrors, updateI18n, validate, withIncreasedRank };
//# sourceMappingURL=jsonforms-core.esm.js.map
