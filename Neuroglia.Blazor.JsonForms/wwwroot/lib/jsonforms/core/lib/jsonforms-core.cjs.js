'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isEmpty = require('lodash/isEmpty');
var startCase = require('lodash/startCase');
var keys = require('lodash/keys');
var union = require('lodash/union');
var merge = require('lodash/merge');
var cloneDeep = require('lodash/cloneDeep');
var setFp = require('lodash/fp/set');
var get = require('lodash/get');
var filter = require('lodash/filter');
var isEqual = require('lodash/isEqual');
var isFunction = require('lodash/isFunction');
var maxBy = require('lodash/maxBy');
var remove = require('lodash/remove');
var endsWith = require('lodash/endsWith');
var last = require('lodash/last');
var isArray = require('lodash/isArray');
var reduce = require('lodash/reduce');
var toPairs = require('lodash/toPairs');
var includes = require('lodash/includes');
var find = require('lodash/find');
var range = require('lodash/range');
var has = require('lodash/has');
var Ajv = require('ajv');
var addFormats = require('ajv-formats');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isEmpty__default = /*#__PURE__*/_interopDefaultLegacy(isEmpty);
var startCase__default = /*#__PURE__*/_interopDefaultLegacy(startCase);
var keys__default = /*#__PURE__*/_interopDefaultLegacy(keys);
var union__default = /*#__PURE__*/_interopDefaultLegacy(union);
var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);
var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);
var setFp__default = /*#__PURE__*/_interopDefaultLegacy(setFp);
var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
var filter__default = /*#__PURE__*/_interopDefaultLegacy(filter);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var isFunction__default = /*#__PURE__*/_interopDefaultLegacy(isFunction);
var maxBy__default = /*#__PURE__*/_interopDefaultLegacy(maxBy);
var remove__default = /*#__PURE__*/_interopDefaultLegacy(remove);
var endsWith__default = /*#__PURE__*/_interopDefaultLegacy(endsWith);
var last__default = /*#__PURE__*/_interopDefaultLegacy(last);
var isArray__default = /*#__PURE__*/_interopDefaultLegacy(isArray);
var reduce__default = /*#__PURE__*/_interopDefaultLegacy(reduce);
var toPairs__default = /*#__PURE__*/_interopDefaultLegacy(toPairs);
var includes__default = /*#__PURE__*/_interopDefaultLegacy(includes);
var find__default = /*#__PURE__*/_interopDefaultLegacy(find);
var range__default = /*#__PURE__*/_interopDefaultLegacy(range);
var has__default = /*#__PURE__*/_interopDefaultLegacy(has);
var Ajv__default = /*#__PURE__*/_interopDefaultLegacy(Ajv);
var addFormats__default = /*#__PURE__*/_interopDefaultLegacy(addFormats);

var ADDITIONAL_PROPERTIES = 'additionalProperties';
var REQUIRED_PROPERTIES = 'required';
var distinct = function (properties, discriminator) {
    var known = {};
    return properties.filter(function (item) {
        var discriminatorValue = discriminator(item);
        if (known.hasOwnProperty(discriminatorValue)) {
            return false;
        }
        else {
            known[discriminatorValue] = true;
            return true;
        }
    });
};
var Gen =  (function () {
    function Gen(findOption) {
        var _this = this;
        this.findOption = findOption;
        this.schemaObject = function (data) {
            var props = _this.properties(data);
            var schema = {
                type: 'object',
                properties: props,
                additionalProperties: _this.findOption(props)(ADDITIONAL_PROPERTIES)
            };
            var required = _this.findOption(props)(REQUIRED_PROPERTIES);
            if (required.length > 0) {
                schema.required = required;
            }
            return schema;
        };
        this.properties = function (data) {
            var emptyProps = {};
            return Object.keys(data).reduce(function (acc, propName) {
                acc[propName] = _this.property(data[propName]);
                return acc;
            }, emptyProps);
        };
        this.property = function (data) {
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
                    return _this.schemaObjectOrArray(data);
                default:
                    return {};
            }
        };
        this.schemaObjectOrArray = function (data) {
            if (data instanceof Array) {
                return _this.schemaArray(data);
            }
            else {
                return _this.schemaObject(data);
            }
        };
        this.schemaArray = function (data) {
            if (data.length > 0) {
                var allProperties = data.map(_this.property);
                var uniqueProperties = distinct(allProperties, function (prop) {
                    return JSON.stringify(prop);
                });
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
    return Gen;
}());
var generateJsonSchema = function (instance, options) {
    if (options === void 0) { options = {}; }
    var findOption = function (props) { return function (optionName) {
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
    }; };
    var gen = new Gen(findOption);
    return gen.schemaObject(instance);
};

var Draft4 = {
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

exports.RuleEffect = void 0;
(function (RuleEffect) {
    RuleEffect["HIDE"] = "HIDE";
    RuleEffect["SHOW"] = "SHOW";
    RuleEffect["ENABLE"] = "ENABLE";
    RuleEffect["DISABLE"] = "DISABLE";
})(exports.RuleEffect || (exports.RuleEffect = {}));
var isInternationalized = function (element) {
    return typeof element === 'object' && element !== null && typeof element.i18n === 'string';
};
var isGroup = function (layout) {
    return layout.type === 'Group';
};
var isLayout = function (uischema) {
    return uischema.elements !== undefined;
};
var isScopable = function (obj) {
    return obj && typeof obj === 'object';
};
var isScoped = function (obj) {
    return isScopable(obj) && typeof obj.scope === 'string';
};
var isLabelable = function (obj) {
    return obj && typeof obj === 'object';
};
var isLabeled = function (obj) {
    return isLabelable(obj) && ['string', 'boolean'].includes(typeof obj.label);
};

var move = function (array, index, delta) {
    var newIndex = index + delta;
    if (newIndex < 0 || newIndex >= array.length) {
        return;
    }
    var indexes = [index, newIndex].sort(function (a, b) { return a - b; });
    array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]);
};
var moveUp = function (array, toMove) {
    move(array, toMove, -1);
};
var moveDown = function (array, toMove) {
    move(array, toMove, 1);
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var cellReducer = function (state, _a) {
    if (state === void 0) { state = []; }
    var type = _a.type, tester = _a.tester, cell = _a.cell;
    switch (type) {
        case ADD_CELL:
            return state.concat([{ tester: tester, cell: cell }]);
        case REMOVE_CELL:
            return state.filter(function (t) { return t.tester !== tester; });
        default:
            return state;
    }
};

var configDefault = {
    restrict: false,
    trim: false,
    showUnfocusedDescription: false,
    hideRequiredAsterisk: false
};

var applyDefaultConfiguration = function (config) {
    if (config === void 0) { config = {}; }
    return merge__default["default"]({}, configDefault, config);
};
var configReducer = function (state, action) {
    if (state === void 0) { state = applyDefaultConfiguration(); }
    switch (action.type) {
        case SET_CONFIG:
            return applyDefaultConfiguration(action.config);
        default:
            return state;
    }
};

var validate = function (validator, data) {
    if (validator === undefined) {
        return [];
    }
    var valid = validator(data);
    if (valid) {
        return [];
    }
    return validator.errors;
};
var initState = {
    data: {},
    schema: {},
    uischema: undefined,
    errors: [],
    validator: undefined,
    ajv: undefined,
    validationMode: 'ValidateAndShow',
    additionalErrors: []
};
var reuseAjvForSchema = function (ajv, schema) {
    if (schema.hasOwnProperty('id') || schema.hasOwnProperty('$id')) {
        ajv.removeSchema(schema);
    }
    return ajv;
};
var getOrCreateAjv = function (state, action) {
    if (action) {
        if (hasAjvOption(action.options)) {
            return action.options.ajv;
        }
        else if (action.options !== undefined) {
            if (isFunction__default["default"](action.options.compile)) {
                return action.options;
            }
        }
    }
    if (state.ajv) {
        return (action === null || action === void 0 ? void 0 : action.schema)
            ? reuseAjvForSchema(state.ajv, action.schema)
            : state.ajv;
    }
    return createAjv();
};
var hasAjvOption = function (option) {
    if (option) {
        return option.ajv !== undefined;
    }
    return false;
};
var getValidationMode = function (state, action) {
    if (action && hasValidationModeOption(action.options)) {
        return action.options.validationMode;
    }
    return state.validationMode;
};
var hasValidationModeOption = function (option) {
    if (option) {
        return option.validationMode !== undefined;
    }
    return false;
};
var hasAdditionalErrorsOption = function (option) {
    if (option) {
        return option.additionalErrors !== undefined;
    }
    return false;
};
var getAdditionalErrors = function (state, action) {
    if (action && hasAdditionalErrorsOption(action.options)) {
        return action.options.additionalErrors;
    }
    return state.additionalErrors;
};
var coreReducer = function (state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case INIT: {
            var thisAjv = getOrCreateAjv(state, action);
            var validationMode = getValidationMode(state, action);
            var v = validationMode === 'NoValidation' ? undefined : thisAjv.compile(action.schema);
            var e = validate(v, action.data);
            var additionalErrors = getAdditionalErrors(state, action);
            return __assign(__assign({}, state), { data: action.data, schema: action.schema, uischema: action.uischema, additionalErrors: additionalErrors, errors: e, validator: v, ajv: thisAjv, validationMode: validationMode });
        }
        case UPDATE_CORE: {
            var thisAjv = getOrCreateAjv(state, action);
            var validationMode = getValidationMode(state, action);
            var validator = state.validator;
            var errors = state.errors;
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
            var additionalErrors = getAdditionalErrors(state, action);
            var stateChanged = state.data !== action.data ||
                state.schema !== action.schema ||
                state.uischema !== action.uischema ||
                state.ajv !== thisAjv ||
                state.errors !== errors ||
                state.validator !== validator ||
                state.validationMode !== validationMode ||
                state.additionalErrors !== additionalErrors;
            return stateChanged
                ? __assign(__assign({}, state), { data: action.data, schema: action.schema, uischema: action.uischema, ajv: thisAjv, errors: isEqual__default["default"](errors, state.errors) ? state.errors : errors, validator: validator, validationMode: validationMode, additionalErrors: additionalErrors }) : state;
        }
        case SET_AJV: {
            var currentAjv = action.ajv;
            var validator = state.validationMode === 'NoValidation' ? undefined : currentAjv.compile(state.schema);
            var errors = validate(validator, state.data);
            return __assign(__assign({}, state), { validator: validator,
                errors: errors });
        }
        case SET_SCHEMA: {
            var needsNewValidator = action.schema && state.ajv && state.validationMode !== 'NoValidation';
            var v = needsNewValidator
                ? reuseAjvForSchema(state.ajv, action.schema).compile(action.schema)
                : state.validator;
            var errors = validate(v, state.data);
            return __assign(__assign({}, state), { validator: v, schema: action.schema, errors: errors });
        }
        case SET_UISCHEMA: {
            return __assign(__assign({}, state), { uischema: action.uischema });
        }
        case UPDATE_DATA: {
            if (action.path === undefined || action.path === null) {
                return state;
            }
            else if (action.path === '') {
                var result = action.updater(cloneDeep__default["default"](state.data));
                var errors = validate(state.validator, result);
                return __assign(__assign({}, state), { data: result, errors: errors });
            }
            else {
                var oldData = get__default["default"](state.data, action.path);
                var newData = action.updater(cloneDeep__default["default"](oldData));
                var newState = setFp__default["default"](action.path, newData, state.data === undefined ? {} : state.data);
                var errors = validate(state.validator, newState);
                return __assign(__assign({}, state), { data: newState, errors: errors });
            }
        }
        case UPDATE_ERRORS: {
            return __assign(__assign({}, state), { errors: action.errors });
        }
        case SET_VALIDATION_MODE: {
            if (state.validationMode === action.validationMode) {
                return state;
            }
            if (action.validationMode === 'NoValidation') {
                var errors = validate(undefined, state.data);
                return __assign(__assign({}, state), { errors: errors, validationMode: action.validationMode });
            }
            if (state.validationMode === 'NoValidation') {
                var validator = reuseAjvForSchema(state.ajv, state.schema).compile(state.schema);
                var errors = validate(validator, state.data);
                return __assign(__assign({}, state), { validator: validator,
                    errors: errors, validationMode: action.validationMode });
            }
            return __assign(__assign({}, state), { validationMode: action.validationMode });
        }
        default:
            return state;
    }
};
var extractData = function (state) { return get__default["default"](state, 'data'); };
var extractSchema = function (state) { return get__default["default"](state, 'schema'); };
var extractUiSchema = function (state) { return get__default["default"](state, 'uischema'); };
var extractAjv = function (state) { return get__default["default"](state, 'ajv'); };
var getInvalidProperty = function (error) {
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
var getControlPath = function (error) {
    var dataPath = error.dataPath;
    if (dataPath) {
        return dataPath.replace(/\//g, '.').substr(1);
    }
    var controlPath = error.instancePath;
    controlPath = controlPath.replace(/\//g, '.');
    var invalidProperty = getInvalidProperty(error);
    if (invalidProperty !== undefined && !controlPath.endsWith(invalidProperty)) {
        controlPath = controlPath + "." + invalidProperty;
    }
    controlPath = controlPath.replace(/^./, '');
    return controlPath;
};
var errorsAt = function (instancePath, schema, matchPath) { return function (errors) {
    var combinatorPaths = filter__default["default"](errors, function (error) { return error.keyword === 'oneOf' || error.keyword === 'anyOf'; }).map(function (error) { return getControlPath(error); });
    return filter__default["default"](errors, function (error) {
        if (filteredErrorKeywords.indexOf(error.keyword) !== -1) {
            return false;
        }
        var controlPath = getControlPath(error);
        var result = matchPath(controlPath);
        var parentSchema = error.parentSchema;
        if (result && !isObjectSchema$1(parentSchema)
            && combinatorPaths.findIndex(function (p) { return instancePath.startsWith(p); }) !== -1) {
            result = result && isEqual__default["default"](parentSchema, schema);
        }
        return result;
    });
}; };
var isObjectSchema$1 = function (schema) {
    return (schema === null || schema === void 0 ? void 0 : schema.type) === 'object' || !!(schema === null || schema === void 0 ? void 0 : schema.properties);
};
var filteredErrorKeywords = ['additionalProperties', 'allOf', 'anyOf', 'oneOf'];
var getErrorsAt = function (instancePath, schema, matchPath) { return function (state) {
    var _a, _b;
    var errors = (_a = state.errors) !== null && _a !== void 0 ? _a : [];
    var additionalErrors = (_b = state.additionalErrors) !== null && _b !== void 0 ? _b : [];
    return errorsAt(instancePath, schema, matchPath)(state.validationMode === 'ValidateAndHide' ? additionalErrors : __spreadArray(__spreadArray([], errors), additionalErrors));
}; };
var errorAt = function (instancePath, schema) {
    return getErrorsAt(instancePath, schema, function (path) { return path === instancePath; });
};
var subErrorsAt = function (instancePath, schema) {
    return getErrorsAt(instancePath, schema, function (path) { return path.startsWith(instancePath); });
};

var defaultDataReducer = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case ADD_DEFAULT_DATA:
            return state.concat([
                { schemaPath: action.schemaPath, data: action.data }
            ]);
        case REMOVE_DEFAULT_DATA:
            return state.filter(function (t) { return t.schemaPath !== action.schemaPath; });
        default:
            return state;
    }
};
var extractDefaultData = function (state) { return state; };

var getI18nKeyPrefixBySchema = function (schema, uischema) {
    var _a;
    if (isInternationalized(uischema)) {
        return uischema.i18n;
    }
    return (_a = schema === null || schema === void 0 ? void 0 : schema.i18n) !== null && _a !== void 0 ? _a : undefined;
};
var transformPathToI18nPrefix = function (path) {
    return ((path === null || path === void 0 ? void 0 : path.split('.').filter(function (segment) { return !/^\d+$/.test(segment); }).join('.')) || 'root');
};
var getI18nKeyPrefix = function (schema, uischema, path) {
    var _a;
    return ((_a = getI18nKeyPrefixBySchema(schema, uischema)) !== null && _a !== void 0 ? _a : transformPathToI18nPrefix(path));
};
var getI18nKey = function (schema, uischema, path, key) {
    return getI18nKeyPrefix(schema, uischema, path) + "." + key;
};
var defaultTranslator = function (_id, defaultMessage) { return defaultMessage; };
var defaultErrorTranslator = function (error, t, uischema) {
    var _a;
    var i18nKey = getI18nKey(error.parentSchema, uischema, getControlPath(error), "error." + error.keyword);
    var specializedKeywordMessage = t(i18nKey, undefined, { error: error });
    if (specializedKeywordMessage !== undefined) {
        return specializedKeywordMessage;
    }
    var genericKeywordMessage = t("error." + error.keyword, undefined, { error: error });
    if (genericKeywordMessage !== undefined) {
        return genericKeywordMessage;
    }
    var messageCustomization = t(error.message, undefined, { error: error });
    if (messageCustomization !== undefined) {
        return messageCustomization;
    }
    if (error.keyword === 'required' && ((_a = error.message) === null || _a === void 0 ? void 0 : _a.startsWith('must have required property'))) {
        return t('is a required property', 'is a required property', { error: error });
    }
    return error.message;
};
var getCombinedErrorMessage = function (errors, et, t, schema, uischema, path) {
    if (errors.length > 0 && t) {
        var customErrorKey = getI18nKey(schema, uischema, path, 'error.custom');
        var specializedErrorMessage = t(customErrorKey, undefined, { schema: schema, uischema: uischema, path: path, errors: errors });
        if (specializedErrorMessage !== undefined) {
            return specializedErrorMessage;
        }
    }
    return formatErrorMessage(errors.map(function (error) { return et(error, t, uischema); }));
};
var deriveLabelForUISchemaElement = function (uischema, t) {
    if (uischema.label === false) {
        return undefined;
    }
    if ((uischema.label === undefined || uischema.label === null || uischema.label === true) && !isInternationalized(uischema)) {
        return undefined;
    }
    var stringifiedLabel = typeof uischema.label === 'string' ? uischema.label : JSON.stringify(uischema.label);
    var i18nKeyPrefix = getI18nKeyPrefixBySchema(undefined, uischema);
    var i18nKey = typeof i18nKeyPrefix === 'string' ? i18nKeyPrefix + ".label" : stringifiedLabel;
    return t(i18nKey, stringifiedLabel, { uischema: uischema });
};

var defaultJsonFormsI18nState = {
    locale: 'en',
    translate: defaultTranslator,
    translateError: defaultErrorTranslator
};
var i18nReducer = function (state, action) {
    var _a, _b, _c, _d, _e, _f;
    if (state === void 0) { state = defaultJsonFormsI18nState; }
    switch (action.type) {
        case UPDATE_I18N: {
            var locale = (_a = action.locale) !== null && _a !== void 0 ? _a : defaultJsonFormsI18nState.locale;
            var translate = (_b = action.translator) !== null && _b !== void 0 ? _b : defaultJsonFormsI18nState.translate;
            var translateError = (_c = action.errorTranslator) !== null && _c !== void 0 ? _c : defaultJsonFormsI18nState.translateError;
            if (locale !== state.locale ||
                translate !== state.translate ||
                translateError !== state.translateError) {
                return __assign(__assign({}, state), { locale: locale,
                    translate: translate,
                    translateError: translateError });
            }
            return state;
        }
        case SET_TRANSLATOR:
            return __assign(__assign({}, state), { translate: (_d = action.translator) !== null && _d !== void 0 ? _d : defaultTranslator, translateError: (_e = action.errorTranslator) !== null && _e !== void 0 ? _e : defaultErrorTranslator });
        case SET_LOCALE:
            return __assign(__assign({}, state), { locale: (_f = action.locale) !== null && _f !== void 0 ? _f : navigator.languages[0] });
        default:
            return state;
    }
};
var fetchLocale = function (state) {
    if (state === undefined) {
        return undefined;
    }
    return state.locale;
};
var fetchTranslator = function (state) {
    if (state === undefined) {
        return defaultTranslator;
    }
    return state.translate;
};
var fetchErrorTranslator = function (state) {
    if (state === undefined) {
        return defaultErrorTranslator;
    }
    return state.translateError;
};

var rendererReducer = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case ADD_RENDERER:
            return state.concat([
                { tester: action.tester, renderer: action.renderer }
            ]);
        case REMOVE_RENDERER:
            return state.filter(function (t) { return t.tester !== action.tester; });
        default:
            return state;
    }
};

var NOT_APPLICABLE = -1;
var isControl = function (uischema) {
    return !isEmpty__default["default"](uischema) && uischema.scope !== undefined;
};
var schemaMatches = function (predicate) { return function (uischema, schema, context) {
    if (isEmpty__default["default"](uischema) || !isControl(uischema)) {
        return false;
    }
    if (isEmpty__default["default"](schema)) {
        return false;
    }
    var schemaPath = uischema.scope;
    if (isEmpty__default["default"](schemaPath)) {
        return false;
    }
    var currentDataSchema = schema;
    if (hasType(schema, 'object')) {
        currentDataSchema = resolveSchema(schema, schemaPath, context === null || context === void 0 ? void 0 : context.rootSchema);
    }
    if (currentDataSchema === undefined) {
        return false;
    }
    return predicate(currentDataSchema, context === null || context === void 0 ? void 0 : context.rootSchema);
}; };
var schemaSubPathMatches = function (subPath, predicate) { return function (uischema, schema, context) {
    if (isEmpty__default["default"](uischema) || !isControl(uischema)) {
        return false;
    }
    var schemaPath = uischema.scope;
    var currentDataSchema = schema;
    if (hasType(schema, 'object')) {
        currentDataSchema = resolveSchema(schema, schemaPath, context === null || context === void 0 ? void 0 : context.rootSchema);
    }
    currentDataSchema = get__default["default"](currentDataSchema, subPath);
    if (currentDataSchema === undefined) {
        return false;
    }
    return predicate(currentDataSchema, context === null || context === void 0 ? void 0 : context.rootSchema);
}; };
var schemaTypeIs = function (expectedType) {
    return schemaMatches(function (schema) { return !isEmpty__default["default"](schema) && hasType(schema, expectedType); });
};
var formatIs = function (expectedFormat) {
    return schemaMatches(function (schema) {
        return !isEmpty__default["default"](schema) &&
            schema.format === expectedFormat &&
            hasType(schema, 'string');
    });
};
var uiTypeIs = function (expected) { return function (uischema) { return !isEmpty__default["default"](uischema) && uischema.type === expected; }; };
var optionIs = function (optionName, optionValue) { return function (uischema) {
    if (isEmpty__default["default"](uischema)) {
        return false;
    }
    var options = uischema.options;
    return !isEmpty__default["default"](options) && options[optionName] === optionValue;
}; };
var scopeEndsWith = function (expected) { return function (uischema) {
    if (isEmpty__default["default"](expected) || !isControl(uischema)) {
        return false;
    }
    return endsWith__default["default"](uischema.scope, expected);
}; };
var scopeEndIs = function (expected) { return function (uischema) {
    if (isEmpty__default["default"](expected) || !isControl(uischema)) {
        return false;
    }
    var schemaPath = uischema.scope;
    return !isEmpty__default["default"](schemaPath) && last__default["default"](schemaPath.split('/')) === expected;
}; };
var and = function () {
    var testers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        testers[_i] = arguments[_i];
    }
    return function (uischema, schema, context) { return testers.reduce(function (acc, tester) { return acc && tester(uischema, schema, context); }, true); };
};
var or = function () {
    var testers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        testers[_i] = arguments[_i];
    }
    return function (uischema, schema, context) { return testers.reduce(function (acc, tester) { return acc || tester(uischema, schema, context); }, false); };
};
var rankWith = function (rank, tester) { return function (uischema, schema, context) {
    if (tester(uischema, schema, context)) {
        return rank;
    }
    return NOT_APPLICABLE;
}; };
var withIncreasedRank = function (by, rankedTester) { return function (uischema, schema, context) {
    var rank = rankedTester(uischema, schema, context);
    if (rank === NOT_APPLICABLE) {
        return NOT_APPLICABLE;
    }
    return rank + by;
}; };
var isBooleanControl = and(uiTypeIs('Control'), schemaTypeIs('boolean'));
var isObjectControl = and(uiTypeIs('Control'), schemaTypeIs('object'));
var isAllOfControl = and(uiTypeIs('Control'), schemaMatches(function (schema) { return schema.hasOwnProperty('allOf'); }));
var isAnyOfControl = and(uiTypeIs('Control'), schemaMatches(function (schema) { return schema.hasOwnProperty('anyOf'); }));
var isOneOfControl = and(uiTypeIs('Control'), schemaMatches(function (schema) { return schema.hasOwnProperty('oneOf'); }));
var isEnumControl = and(uiTypeIs('Control'), or(schemaMatches(function (schema) { return schema.hasOwnProperty('enum'); }), schemaMatches(function (schema) { return schema.hasOwnProperty('const'); })));
var isOneOfEnumControl = and(uiTypeIs('Control'), schemaMatches(function (schema) {
    return schema.hasOwnProperty('oneOf') &&
        schema.oneOf.every(function (s) { return s.const !== undefined; });
}));
var isIntegerControl = and(uiTypeIs('Control'), schemaTypeIs('integer'));
var isNumberControl = and(uiTypeIs('Control'), schemaTypeIs('number'));
var isStringControl = and(uiTypeIs('Control'), schemaTypeIs('string'));
var isMultiLineControl = and(uiTypeIs('Control'), optionIs('multi', true));
var isDateControl = and(uiTypeIs('Control'), or(formatIs('date'), optionIs('format', 'date')));
var isTimeControl = and(uiTypeIs('Control'), or(formatIs('time'), optionIs('format', 'time')));
var isDateTimeControl = and(uiTypeIs('Control'), or(formatIs('date-time'), optionIs('format', 'date-time')));
var isObjectArray = and(schemaMatches(function (schema, rootSchema) { return hasType(schema, 'array') && !Array.isArray(resolveSchema(schema, 'items', rootSchema)); }
), schemaSubPathMatches('items', function (schema, rootSchema) {
    var resolvedSchema = schema.$ref ? resolveSchema(rootSchema, schema.$ref, rootSchema) : schema;
    return hasType(resolvedSchema, 'object');
}));
var isObjectArrayControl = and(uiTypeIs('Control'), isObjectArray);
var traverse = function (any, pred, rootSchema) {
    if (isArray__default["default"](any)) {
        return reduce__default["default"](any, function (acc, el) { return acc || traverse(el, pred, rootSchema); }, false);
    }
    if (pred(any)) {
        return true;
    }
    if (any.$ref) {
        var toTraverse = resolveSchema(rootSchema, any.$ref, rootSchema);
        if (toTraverse && !toTraverse.$ref) {
            return traverse(toTraverse, pred, rootSchema);
        }
    }
    if (any.items) {
        return traverse(any.items, pred, rootSchema);
    }
    if (any.properties) {
        return reduce__default["default"](toPairs__default["default"](any.properties), function (acc, _a) {
            _a[0]; var val = _a[1];
            return acc || traverse(val, pred, rootSchema);
        }, false);
    }
    return false;
};
var isObjectArrayWithNesting = function (uischema, schema, context) {
    var _a;
    if (!uiTypeIs('Control')(uischema, schema, context)) {
        return false;
    }
    var schemaPath = uischema.scope;
    var resolvedSchema = resolveSchema(schema, schemaPath, (_a = context === null || context === void 0 ? void 0 : context.rootSchema) !== null && _a !== void 0 ? _a : schema);
    var objectDepth = 0;
    if (resolvedSchema !== undefined && resolvedSchema.items !== undefined) {
        if (traverse(resolvedSchema.items, function (val) {
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
        }, context === null || context === void 0 ? void 0 : context.rootSchema)) {
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
var isArrayObjectControl = isObjectArrayControl;
var isPrimitiveArrayControl = and(uiTypeIs('Control'), schemaMatches(function (schema, rootSchema) {
    return deriveTypes(schema).length !== 0 &&
        !Array.isArray(resolveSchema(schema, 'items', rootSchema));
}
), schemaSubPathMatches('items', function (schema, rootSchema) {
    var resolvedSchema = schema.$ref ? resolveSchema(rootSchema, schema.$ref, rootSchema) : schema;
    var types = deriveTypes(resolvedSchema);
    return (types.length === 1 &&
        includes__default["default"](['integer', 'number', 'boolean', 'string'], types[0]));
}));
var isRangeControl = and(uiTypeIs('Control'), or(schemaTypeIs('number'), schemaTypeIs('integer')), schemaMatches(function (schema) {
    return schema.hasOwnProperty('maximum') &&
        schema.hasOwnProperty('minimum') &&
        schema.hasOwnProperty('default');
}), optionIs('slider', true));
var isNumberFormatControl = and(uiTypeIs('Control'), schemaTypeIs('integer'), optionIs('format', true));
var isCategorization = function (category) { return category.type === 'Categorization'; };
var isCategory = function (uischema) {
    return uischema.type === 'Category';
};
var hasCategory = function (categorization) {
    if (isEmpty__default["default"](categorization.elements)) {
        return false;
    }
    return categorization.elements
        .map(function (elem) {
        return isCategorization(elem) ? hasCategory(elem) : isCategory(elem);
    })
        .reduce(function (prev, curr) { return prev && curr; }, true);
};
var categorizationHasCategory = function (uischema) {
    return hasCategory(uischema);
};
var not = function (tester) { return function (uischema, schema, context) { return !tester(uischema, schema, context); }; };

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

var uischemaRegistryReducer = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case ADD_UI_SCHEMA:
            return state
                .slice()
                .concat({ tester: action.tester, uischema: action.uischema });
        case REMOVE_UI_SCHEMA:
            var copy = state.slice();
            remove__default["default"](copy, function (entry) { return entry.tester === action.tester; });
            return copy;
        default:
            return state;
    }
};
var findMatchingUISchema = function (state) { return function (jsonSchema, schemaPath, path) {
    var match = maxBy__default["default"](state, function (entry) {
        return entry.tester(jsonSchema, schemaPath, path);
    });
    if (match !== undefined &&
        match.tester(jsonSchema, schemaPath, path) !== NOT_APPLICABLE) {
        return match.uischema;
    }
    return undefined;
}; };

var jsonFormsReducerConfig = {
    core: coreReducer,
    renderers: rendererReducer,
    cells: cellReducer,
    config: configReducer,
    uischemas: uischemaRegistryReducer,
    defaultData: defaultDataReducer,
    i18n: i18nReducer,
};
var findUISchema = function (uischemas, schema, schemaPath, path, fallback, control, rootSchema) {
    if (fallback === void 0) { fallback = 'VerticalLayout'; }
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
    var uiSchema = findMatchingUISchema(uischemas)(schema, schemaPath, path);
    if (uiSchema === undefined) {
        if (typeof fallback === 'function') {
            return fallback();
        }
        return Generate.uiSchema(schema, fallback, '#', rootSchema);
    }
    return uiSchema;
};
var getErrorAt = function (instancePath, schema) { return function (state) {
    return errorAt(instancePath, schema)(state.jsonforms.core);
}; };
var getSubErrorsAt = function (instancePath, schema) { return function (state) { return subErrorsAt(instancePath, schema)(state.jsonforms.core); }; };
var getConfig = function (state) { return state.jsonforms.config; };
var getLocale = function (state) {
    return fetchLocale(get__default["default"](state, 'jsonforms.i18n'));
};
var getTranslator = function () { return function (state) { return fetchTranslator(get__default["default"](state, 'jsonforms.i18n')); }; };
var getErrorTranslator = function () { return function (state) { return fetchErrorTranslator(get__default["default"](state, 'jsonforms.i18n')); }; };

var getData = function (state) {
    return extractData(get__default["default"](state, 'jsonforms.core'));
};
var getSchema = function (state) {
    return extractSchema(get__default["default"](state, 'jsonforms.core'));
};
var getUiSchema = function (state) {
    return extractUiSchema(get__default["default"](state, 'jsonforms.core'));
};
var getAjv = function (state) { return extractAjv(get__default["default"](state, 'jsonforms.core')); };
var getDefaultData = function (state) {
    return extractDefaultData(get__default["default"](state, 'jsonforms.defaultData'));
};
var getRenderers = function (state) { return get__default["default"](state, 'jsonforms.renderers'); };
var getCells = function (state) { return get__default["default"](state, 'jsonforms.cells'); };
var getUISchemas = function (state) { return get__default["default"](state, 'jsonforms.uischemas'); };

var compose = function (path1, path2) {
    var p1 = path1;
    if (!isEmpty__default["default"](path1) && !isEmpty__default["default"](path2) && !path2.startsWith('[')) {
        p1 = path1 + '.';
    }
    if (isEmpty__default["default"](p1)) {
        return path2;
    }
    else if (isEmpty__default["default"](path2)) {
        return p1;
    }
    else {
        return "" + p1 + path2;
    }
};
var toDataPathSegments = function (schemaPath) {
    var s = schemaPath
        .replace(/(anyOf|allOf|oneOf)\/[\d]\//g, '')
        .replace(/(then|else)\//g, '');
    var segments = s.split('/');
    var decodedSegments = segments.map(decode);
    var startFromRoot = decodedSegments[0] === '#' || decodedSegments[0] === '';
    var startIndex = startFromRoot ? 2 : 1;
    return range__default["default"](startIndex, decodedSegments.length, 2).map(function (idx) { return decodedSegments[idx]; });
};
var toDataPath = function (schemaPath) {
    return toDataPathSegments(schemaPath).join('.');
};
var composeWithUi = function (scopableUi, path) {
    if (!isScoped(scopableUi)) {
        return path !== null && path !== void 0 ? path : '';
    }
    var segments = toDataPathSegments(scopableUi.scope);
    if (isEmpty__default["default"](segments)) {
        return path !== null && path !== void 0 ? path : '';
    }
    return compose(path, segments.join('.'));
};
var encode = function (segment) { return segment === null || segment === void 0 ? void 0 : segment.replace(/~/g, '~0').replace(/\//g, '~1'); };
var decode = function (pointerSegment) { return pointerSegment === null || pointerSegment === void 0 ? void 0 : pointerSegment.replace(/~1/g, '/').replace(/~0/, '~'); };

var isObjectSchema = function (schema) {
    return schema.properties !== undefined;
};
var isArraySchema = function (schema) {
    return schema.type === 'array' && schema.items !== undefined;
};
var resolveData = function (instance, dataPath) {
    if (isEmpty__default["default"](dataPath)) {
        return instance;
    }
    var dataPathSegments = dataPath.split('.');
    return dataPathSegments
        .map(function (segment) { return decodeURIComponent(segment); })
        .reduce(function (curInstance, decodedSegment) {
        if (!curInstance || !curInstance.hasOwnProperty(decodedSegment)) {
            return undefined;
        }
        return curInstance[decodedSegment];
    }, instance);
};
var findAllRefs = function (schema, result, resolveTuples) {
    if (result === void 0) { result = {}; }
    if (resolveTuples === void 0) { resolveTuples = false; }
    if (isObjectSchema(schema)) {
        Object.keys(schema.properties).forEach(function (key) {
            return findAllRefs(schema.properties[key], result);
        });
    }
    if (isArraySchema(schema)) {
        if (Array.isArray(schema.items)) {
            if (resolveTuples) {
                var items = schema.items;
                items.forEach(function (child) { return findAllRefs(child, result); });
            }
        }
        else {
            findAllRefs(schema.items, result);
        }
    }
    if (Array.isArray(schema.anyOf)) {
        var anyOf = schema.anyOf;
        anyOf.forEach(function (child) { return findAllRefs(child, result); });
    }
    if (schema.$ref !== undefined) {
        result[schema.$ref] = schema;
    }
    return result;
};
var invalidSegment = function (pathSegment) {
    return pathSegment === '#' || pathSegment === undefined || pathSegment === '';
};
var resolveSchema = function (schema, schemaPath, rootSchema) {
    var segments = schemaPath === null || schemaPath === void 0 ? void 0 : schemaPath.split('/').map(decode);
    return resolveSchemaWithSegments(schema, segments, rootSchema);
};
var resolveSchemaWithSegments = function (schema, pathSegments, rootSchema) {
    var _a, _b, _c, _d, _e;
    if (isEmpty__default["default"](schema)) {
        return undefined;
    }
    if (schema.$ref) {
        schema = resolveSchema(rootSchema, schema.$ref, rootSchema);
    }
    if (!pathSegments || pathSegments.length === 0) {
        return schema;
    }
    var segment = pathSegments[0], remainingSegments = pathSegments.slice(1);
    if (invalidSegment(segment)) {
        return resolveSchemaWithSegments(schema, remainingSegments, rootSchema);
    }
    var singleSegmentResolveSchema = get__default["default"](schema, segment);
    var resolvedSchema = resolveSchemaWithSegments(singleSegmentResolveSchema, remainingSegments, rootSchema);
    if (resolvedSchema) {
        return resolvedSchema;
    }
    if (segment === 'properties' || segment === 'items') {
        var alternativeResolveResult = undefined;
        var subSchemas = [].concat((_a = schema.oneOf) !== null && _a !== void 0 ? _a : [], (_b = schema.allOf) !== null && _b !== void 0 ? _b : [], (_c = schema.anyOf) !== null && _c !== void 0 ? _c : [], (_d = schema.then) !== null && _d !== void 0 ? _d : [], (_e = schema.else) !== null && _e !== void 0 ? _e : []);
        for (var _i = 0, subSchemas_1 = subSchemas; _i < subSchemas_1.length; _i++) {
            var subSchema = subSchemas_1[_i];
            alternativeResolveResult = resolveSchemaWithSegments(subSchema, __spreadArray([segment], remainingSegments), rootSchema);
            if (alternativeResolveResult) {
                break;
            }
        }
        return alternativeResolveResult;
    }
    return undefined;
};

var isOrCondition = function (condition) {
    return condition.type === 'OR';
};
var isAndCondition = function (condition) {
    return condition.type === 'AND';
};
var isLeafCondition = function (condition) {
    return condition.type === 'LEAF';
};
var isSchemaCondition = function (condition) { return has__default["default"](condition, 'schema'); };
var getConditionScope = function (condition, path) {
    return composeWithUi(condition, path);
};
var evaluateCondition = function (data, condition, path, ajv) {
    if (isAndCondition(condition)) {
        return condition.conditions.reduce(function (acc, cur) { return acc && evaluateCondition(data, cur, path, ajv); }, true);
    }
    else if (isOrCondition(condition)) {
        return condition.conditions.reduce(function (acc, cur) { return acc || evaluateCondition(data, cur, path, ajv); }, false);
    }
    else if (isLeafCondition(condition)) {
        var value = resolveData(data, getConditionScope(condition, path));
        return value === condition.expectedValue;
    }
    else if (isSchemaCondition(condition)) {
        var value = resolveData(data, getConditionScope(condition, path));
        return ajv.validate(condition.schema, value);
    }
    else {
        return true;
    }
};
var isRuleFulfilled = function (uischema, data, path, ajv) {
    var condition = uischema.rule.condition;
    return evaluateCondition(data, condition, path, ajv);
};
var evalVisibility = function (uischema, data, path, ajv) {
    if (path === void 0) { path = undefined; }
    var fulfilled = isRuleFulfilled(uischema, data, path, ajv);
    switch (uischema.rule.effect) {
        case exports.RuleEffect.HIDE:
            return !fulfilled;
        case exports.RuleEffect.SHOW:
            return fulfilled;
        default:
            return true;
    }
};
var evalEnablement = function (uischema, data, path, ajv) {
    if (path === void 0) { path = undefined; }
    var fulfilled = isRuleFulfilled(uischema, data, path, ajv);
    switch (uischema.rule.effect) {
        case exports.RuleEffect.DISABLE:
            return !fulfilled;
        case exports.RuleEffect.ENABLE:
            return fulfilled;
        default:
            return true;
    }
};
var hasShowRule = function (uischema) {
    if (uischema.rule &&
        (uischema.rule.effect === exports.RuleEffect.SHOW ||
            uischema.rule.effect === exports.RuleEffect.HIDE)) {
        return true;
    }
    return false;
};
var hasEnableRule = function (uischema) {
    if (uischema.rule &&
        (uischema.rule.effect === exports.RuleEffect.ENABLE ||
            uischema.rule.effect === exports.RuleEffect.DISABLE)) {
        return true;
    }
    return false;
};
var isVisible = function (uischema, data, path, ajv) {
    if (path === void 0) { path = undefined; }
    if (uischema.rule) {
        return evalVisibility(uischema, data, path, ajv);
    }
    return true;
};
var isEnabled = function (uischema, data, path, ajv) {
    if (path === void 0) { path = undefined; }
    if (uischema.rule) {
        return evalEnablement(uischema, data, path, ajv);
    }
    return true;
};
var isInherentlyEnabled = function (state, ownProps, uischema, schema, rootData, config) {
    var _a, _b, _c;
    if ((_a = state === null || state === void 0 ? void 0 : state.jsonforms) === null || _a === void 0 ? void 0 : _a.readonly) {
        return false;
    }
    if (uischema && hasEnableRule(uischema)) {
        return isEnabled(uischema, rootData, ownProps === null || ownProps === void 0 ? void 0 : ownProps.path, getAjv(state));
    }
    if (typeof ((_b = uischema === null || uischema === void 0 ? void 0 : uischema.options) === null || _b === void 0 ? void 0 : _b.readonly) === 'boolean') {
        return !uischema.options.readonly;
    }
    if (typeof ((_c = uischema === null || uischema === void 0 ? void 0 : uischema.options) === null || _c === void 0 ? void 0 : _c.readOnly) === 'boolean') {
        return !uischema.options.readOnly;
    }
    if (typeof (config === null || config === void 0 ? void 0 : config.readonly) === 'boolean') {
        return !config.readonly;
    }
    if (typeof (config === null || config === void 0 ? void 0 : config.readOnly) === 'boolean') {
        return !config.readOnly;
    }
    if ((schema === null || schema === void 0 ? void 0 : schema.readOnly) === true) {
        return false;
    }
    if (typeof (ownProps === null || ownProps === void 0 ? void 0 : ownProps.enabled) === 'boolean') {
        return ownProps.enabled;
    }
    return true;
};

var convertToValidClassName = function (s) {
    return s.replace('#', 'root').replace(new RegExp('/', 'g'), '_');
};
var formatErrorMessage = function (errors) {
    if (errors === undefined || errors === null) {
        return '';
    }
    return errors.join('\n');
};
var hasType = function (jsonSchema, expected) {
    return includes__default["default"](deriveTypes(jsonSchema), expected);
};
var deriveTypes = function (jsonSchema) {
    if (isEmpty__default["default"](jsonSchema)) {
        return [];
    }
    if (!isEmpty__default["default"](jsonSchema.type) && typeof jsonSchema.type === 'string') {
        return [jsonSchema.type];
    }
    if (isArray__default["default"](jsonSchema.type)) {
        return jsonSchema.type;
    }
    if (!isEmpty__default["default"](jsonSchema.properties) ||
        !isEmpty__default["default"](jsonSchema.additionalProperties)) {
        return ['object'];
    }
    if (!isEmpty__default["default"](jsonSchema.items)) {
        return ['array'];
    }
    if (!isEmpty__default["default"](jsonSchema.allOf)) {
        var allOfType = find__default["default"](jsonSchema.allOf, function (schema) { return deriveTypes(schema).length !== 0; });
        if (allOfType) {
            return deriveTypes(allOfType);
        }
    }
    return [];
};
var Resolve = {
    schema: resolveSchema,
    data: resolveData
};
var fromScoped = function (scopable) {
    return toDataPathSegments(scopable.scope).join('.');
};
var Paths = {
    compose: compose,
    fromScoped: fromScoped
};
var Runtime = {
    isEnabled: function (uischema, data, ajv) {
        return isEnabled(uischema, data, undefined, ajv);
    },
    isVisible: function (uischema, data, ajv) {
        return isVisible(uischema, data, undefined, ajv);
    }
};

var deriveLabel = function (controlElement, schemaElement) {
    if (schemaElement && typeof schemaElement.title === 'string') {
        return schemaElement.title;
    }
    if (typeof controlElement.scope === 'string') {
        var ref = controlElement.scope;
        var label = decode(ref.substr(ref.lastIndexOf('/') + 1));
        return startCase__default["default"](label);
    }
    return '';
};
var createCleanLabel = function (label) {
    return startCase__default["default"](label.replace('_', ' '));
};
var createLabelDescriptionFrom = function (withLabel, schema) {
    var labelProperty = withLabel.label;
    if (typeof labelProperty === 'boolean') {
        return labelDescription(deriveLabel(withLabel, schema), labelProperty);
    }
    if (typeof labelProperty === 'string') {
        return labelDescription(labelProperty, true);
    }
    if (typeof labelProperty === 'object') {
        var label = typeof labelProperty.text === 'string'
            ? labelProperty.text
            : deriveLabel(withLabel, schema);
        var show = typeof labelProperty.show === 'boolean' ? labelProperty.show : true;
        return labelDescription(label, show);
    }
    return labelDescription(deriveLabel(withLabel, schema), true);
};
var labelDescription = function (text, show) { return ({
    text: text,
    show: show
}); };

var isRequired = function (schema, schemaPath, rootSchema) {
    var pathSegments = schemaPath.split('/');
    var lastSegment = pathSegments[pathSegments.length - 1];
    var nextHigherSchemaSegments = pathSegments.slice(0, pathSegments.length - 2);
    var nextHigherSchemaPath = nextHigherSchemaSegments.join('/');
    var nextHigherSchema = Resolve.schema(schema, nextHigherSchemaPath, rootSchema);
    return (nextHigherSchema !== undefined &&
        nextHigherSchema.required !== undefined &&
        nextHigherSchema.required.indexOf(lastSegment) !== -1);
};
var computeLabel = function (label, required, hideRequiredAsterisk) {
    return "" + (label !== null && label !== void 0 ? label : '') + (required && !hideRequiredAsterisk ? '*' : '');
};
var showAsRequired = function (required, hideRequiredAsterisk) {
    return required && !hideRequiredAsterisk;
};
var createDefaultValue = function (schema) {
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
var isDescriptionHidden = function (visible, description, isFocused, showUnfocusedDescription) {
    return (description === undefined ||
        (description !== undefined && !visible) ||
        (!showUnfocusedDescription && !isFocused));
};
var enumToEnumOptionMapper = function (e, t, i18nKey) {
    var label = typeof e === 'string' ? e : JSON.stringify(e);
    if (t) {
        if (i18nKey) {
            label = t(i18nKey + "." + label, label);
        }
        else {
            label = t(label, label);
        }
    }
    return { label: label, value: e };
};
var oneOfToEnumOptionMapper = function (e, t, fallbackI18nKey) {
    var _a;
    var label = (_a = e.title) !== null && _a !== void 0 ? _a : (typeof e.const === 'string' ? e.const : JSON.stringify(e.const));
    if (t) {
        if (e.i18n) {
            label = t(e.i18n, label);
        }
        else if (fallbackI18nKey) {
            label = t(fallbackI18nKey + "." + label, label);
        }
        else {
            label = t(label, label);
        }
    }
    return {
        label: label,
        value: e.const,
    };
};
var mapStateToControlProps = function (state, ownProps) {
    var uischema = ownProps.uischema;
    var rootData = getData(state);
    var path = composeWithUi(uischema, ownProps.path);
    var visible = ownProps.visible === undefined || hasShowRule(uischema)
        ? isVisible(uischema, rootData, ownProps.path, getAjv(state))
        : ownProps.visible;
    var controlElement = uischema;
    var id = ownProps.id;
    var rootSchema = getSchema(state);
    var required = controlElement.scope !== undefined &&
        isRequired(ownProps.schema, controlElement.scope, rootSchema);
    var resolvedSchema = Resolve.schema(ownProps.schema || rootSchema, controlElement.scope, rootSchema);
    var errors = getErrorAt(path, resolvedSchema)(state);
    var description = resolvedSchema !== undefined ? resolvedSchema.description : '';
    var data = Resolve.data(rootData, path);
    var labelDesc = createLabelDescriptionFrom(uischema, resolvedSchema);
    var label = labelDesc.show ? labelDesc.text : '';
    var config = getConfig(state);
    var enabled = isInherentlyEnabled(state, ownProps, uischema, resolvedSchema || rootSchema, rootData, config);
    var schema = resolvedSchema !== null && resolvedSchema !== void 0 ? resolvedSchema : rootSchema;
    var t = getTranslator()(state);
    var te = getErrorTranslator()(state);
    var i18nLabel = t(getI18nKey(schema, uischema, path, 'label'), label, { schema: schema, uischema: uischema, path: path, errors: errors });
    var i18nDescription = t(getI18nKey(schema, uischema, path, 'description'), description, { schema: schema, uischema: uischema, path: path, errors: errors });
    var i18nErrorMessage = getCombinedErrorMessage(errors, te, t, schema, uischema, path);
    return {
        data: data,
        description: i18nDescription,
        errors: i18nErrorMessage,
        label: i18nLabel,
        visible: visible,
        enabled: enabled,
        id: id,
        path: path,
        required: required,
        uischema: uischema,
        schema: schema,
        config: getConfig(state),
        cells: ownProps.cells || state.jsonforms.cells,
        rootSchema: rootSchema
    };
};
var mapDispatchToControlProps = function (dispatch) { return ({
    handleChange: function (path, value) {
        dispatch(update(path, function () { return value; }));
    }
}); };
var mapStateToEnumControlProps = function (state, ownProps) {
    var _a;
    var props = mapStateToControlProps(state, ownProps);
    var options = ownProps.options ||
        ((_a = props.schema.enum) === null || _a === void 0 ? void 0 : _a.map(function (e) {
            return enumToEnumOptionMapper(e, getTranslator()(state), getI18nKeyPrefix(props.schema, props.uischema, props.path));
        })) ||
        (props.schema.const && [
            enumToEnumOptionMapper(props.schema.const, getTranslator()(state), getI18nKeyPrefix(props.schema, props.uischema, props.path))
        ]);
    return __assign(__assign({}, props), { options: options });
};
var mapStateToOneOfEnumControlProps = function (state, ownProps) {
    var _a;
    var props = mapStateToControlProps(state, ownProps);
    var options = ownProps.options ||
        ((_a = props.schema.oneOf) === null || _a === void 0 ? void 0 : _a.map(function (oneOfSubSchema) {
            return oneOfToEnumOptionMapper(oneOfSubSchema, getTranslator()(state), getI18nKeyPrefix(props.schema, props.uischema, props.path));
        }));
    return __assign(__assign({}, props), { options: options });
};
var mapStateToMultiEnumControlProps = function (state, ownProps) {
    var _a;
    var props = mapStateToControlProps(state, ownProps);
    var items = props.schema.items;
    var options = ownProps.options ||
        ((items === null || items === void 0 ? void 0 : items.oneOf) &&
            items.oneOf.map(function (oneOfSubSchema) {
                var _a;
                return oneOfToEnumOptionMapper(oneOfSubSchema, (_a = state.jsonforms.i18n) === null || _a === void 0 ? void 0 : _a.translate, getI18nKeyPrefix(props.schema, props.uischema, props.path));
            })) ||
        ((_a = items === null || items === void 0 ? void 0 : items.enum) === null || _a === void 0 ? void 0 : _a.map(function (e) {
            var _a;
            return enumToEnumOptionMapper(e, (_a = state.jsonforms.i18n) === null || _a === void 0 ? void 0 : _a.translate, getI18nKeyPrefix(props.schema, props.uischema, props.path));
        }));
    return __assign(__assign({}, props), { options: options });
};
var mapStateToMasterListItemProps = function (state, ownProps) {
    var schema = ownProps.schema, path = ownProps.path, index = ownProps.index;
    var firstPrimitiveProp = schema.properties
        ? find__default["default"](Object.keys(schema.properties), function (propName) {
            var prop = schema.properties[propName];
            return (prop.type === 'string' ||
                prop.type === 'number' ||
                prop.type === 'integer');
        })
        : undefined;
    var childPath = compose(path, "" + index);
    var childData = Resolve.data(getData(state), childPath);
    var childLabel = firstPrimitiveProp ? childData[firstPrimitiveProp] : '';
    return __assign(__assign({}, ownProps), { childLabel: childLabel });
};
var mapStateToControlWithDetailProps = function (state, ownProps) {
    var props = __rest(mapStateToControlProps(state, ownProps), []);
    return __assign(__assign({}, props), { uischemas: state.jsonforms.uischemas });
};
var mapStateToArrayControlProps = function (state, ownProps) {
    var _a = mapStateToControlWithDetailProps(state, ownProps), path = _a.path, schema = _a.schema, uischema = _a.uischema, props = __rest(_a, ["path", "schema", "uischema"]);
    var resolvedSchema = Resolve.schema(schema, 'items', props.rootSchema);
    var childErrors = getSubErrorsAt(path, resolvedSchema)(state);
    return __assign(__assign({}, props), { path: path,
        uischema: uischema, schema: resolvedSchema, childErrors: childErrors, renderers: ownProps.renderers || getRenderers(state), cells: ownProps.cells || getCells(state) });
};
var mapDispatchToArrayControlProps = function (dispatch) { return ({
    addItem: function (path, value) { return function () {
        dispatch(update(path, function (array) {
            if (array === undefined || array === null) {
                return [value];
            }
            array.push(value);
            return array;
        }));
    }; },
    removeItems: function (path, toDelete) { return function () {
        dispatch(update(path, function (array) {
            toDelete
                .sort()
                .reverse()
                .forEach(function (s) { return array.splice(s, 1); });
            return array;
        }));
    }; },
    moveUp: function (path, toMove) { return function () {
        dispatch(update(path, function (array) {
            moveUp(array, toMove);
            return array;
        }));
    }; },
    moveDown: function (path, toMove) { return function () {
        dispatch(update(path, function (array) {
            moveDown(array, toMove);
            return array;
        }));
    }; }
}); };
var mapDispatchToMultiEnumProps = function (dispatch) { return ({
    addItem: function (path, value) {
        dispatch(update(path, function (data) {
            if (data === undefined || data === null) {
                return [value];
            }
            data.push(value);
            return data;
        }));
    },
    removeItem: function (path, toDelete) {
        dispatch(update(path, function (data) {
            var indexInData = data.indexOf(toDelete);
            data.splice(indexInData, 1);
            return data;
        }));
    }
}); };
var layoutDefaultProps = {
    visible: true,
    enabled: true,
    path: '',
    direction: 'column'
};
var getDirection = function (uischema) {
    if (uischema.type === 'HorizontalLayout') {
        return 'row';
    }
    if (uischema.type === 'VerticalLayout') {
        return 'column';
    }
    return layoutDefaultProps.direction;
};
var mapStateToLayoutProps = function (state, ownProps) {
    var _a;
    var rootData = getData(state);
    var uischema = ownProps.uischema;
    var visible = ownProps.visible === undefined || hasShowRule(uischema)
        ? isVisible(ownProps.uischema, rootData, ownProps.path, getAjv(state))
        : ownProps.visible;
    var data = Resolve.data(rootData, ownProps.path);
    var config = getConfig(state);
    var enabled = isInherentlyEnabled(state, ownProps, uischema, undefined,
    rootData, config);
    var t = getTranslator()(state);
    var label = isLabelable(uischema) ? deriveLabelForUISchemaElement(uischema, t) : undefined;
    return __assign(__assign({}, layoutDefaultProps), { renderers: ownProps.renderers || getRenderers(state), cells: ownProps.cells || getCells(state), visible: visible,
        enabled: enabled, path: ownProps.path, data: data, uischema: ownProps.uischema, schema: ownProps.schema, direction: (_a = ownProps.direction) !== null && _a !== void 0 ? _a : getDirection(uischema), config: config,
        label: label });
};
var mapStateToJsonFormsRendererProps = function (state, ownProps) {
    return {
        renderers: ownProps.renderers || get__default["default"](state.jsonforms, 'renderers'),
        cells: ownProps.cells || get__default["default"](state.jsonforms, 'cells'),
        schema: ownProps.schema || getSchema(state),
        rootSchema: getSchema(state),
        uischema: ownProps.uischema || getUiSchema(state),
        path: ownProps.path,
        enabled: ownProps.enabled,
        config: getConfig(state)
    };
};
var controlDefaultProps = __assign(__assign({}, layoutDefaultProps), { errors: [] });
var mapStateToCombinatorRendererProps = function (state, ownProps, keyword) {
    var _a;
    var _b = mapStateToControlProps(state, ownProps), data = _b.data, schema = _b.schema, rootSchema = _b.rootSchema, props = __rest(_b, ["data", "schema", "rootSchema"]);
    var ajv = state.jsonforms.core.ajv;
    var structuralKeywords = [
        'required',
        'additionalProperties',
        'type',
        'enum',
        'const'
    ];
    var dataIsValid = function (errors) {
        return (!errors ||
            errors.length === 0 ||
            !errors.find(function (e) { return structuralKeywords.indexOf(e.keyword) !== -1; }));
    };
    var indexOfFittingSchema;
    for (var i = 0; i < ((_a = schema[keyword]) === null || _a === void 0 ? void 0 : _a.length); i++) {
        try {
            var _schema = schema[keyword][i];
            if (_schema.$ref) {
                _schema = Resolve.schema(rootSchema, _schema.$ref, rootSchema);
            }
            var valFn = ajv.compile(_schema);
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
    return __assign(__assign({ data: data,
        schema: schema,
        rootSchema: rootSchema }, props), { indexOfFittingSchema: indexOfFittingSchema, uischemas: getUISchemas(state) });
};
var mapStateToAllOfProps = function (state, ownProps) {
    return mapStateToCombinatorRendererProps(state, ownProps, 'allOf');
};
var mapStateToAnyOfProps = function (state, ownProps) {
    return mapStateToCombinatorRendererProps(state, ownProps, 'anyOf');
};
var mapStateToOneOfProps = function (state, ownProps) {
    return mapStateToCombinatorRendererProps(state, ownProps, 'oneOf');
};
var mapStateToArrayLayoutProps = function (state, ownProps) {
    var _a = mapStateToControlWithDetailProps(state, ownProps), path = _a.path, schema = _a.schema, uischema = _a.uischema, errors = _a.errors, props = __rest(_a, ["path", "schema", "uischema", "errors"]);
    var resolvedSchema = Resolve.schema(schema, 'items', props.rootSchema);
    var childErrors = getCombinedErrorMessage(getSubErrorsAt(path, resolvedSchema)(state), getErrorTranslator()(state), getTranslator()(state), undefined, undefined, undefined);
    var allErrors = errors +
        (errors.length > 0 && childErrors.length > 0 ? '\n' : '') +
        childErrors;
    return __assign(__assign({}, props), { path: path,
        uischema: uischema, schema: resolvedSchema, data: props.data ? props.data.length : 0, errors: allErrors, minItems: schema.minItems });
};
var mapStateToLabelProps = function (state, props) {
    var uischema = props.uischema;
    var visible = props.visible === undefined || hasShowRule(uischema)
        ? isVisible(props.uischema, getData(state), props.path, getAjv(state))
        : props.visible;
    var text = uischema.text;
    var t = getTranslator()(state);
    var i18nKeyPrefix = getI18nKeyPrefixBySchema(undefined, uischema);
    var i18nKey = i18nKeyPrefix ? i18nKeyPrefix + ".text" : text !== null && text !== void 0 ? text : '';
    var i18nText = t(i18nKey, text, { uischema: uischema });
    return {
        text: i18nText,
        visible: visible,
        config: getConfig(state),
        renderers: props.renderers || getRenderers(state),
        cells: props.cells || getCells(state),
    };
};

var mapStateToCellProps = function (state, ownProps) {
    var id = ownProps.id, schema = ownProps.schema, path = ownProps.path, uischema = ownProps.uischema, renderers = ownProps.renderers, cells = ownProps.cells;
    var rootData = getData(state);
    var visible = ownProps.visible !== undefined
        ? ownProps.visible
        : isVisible(uischema, rootData, undefined, getAjv(state));
    var rootSchema = getSchema(state);
    var config = getConfig(state);
    var enabled;
    if (state.jsonforms.readonly === true) {
        enabled = false;
    }
    else if (typeof ownProps.enabled === 'boolean') {
        enabled = ownProps.enabled;
    }
    else {
        enabled = isInherentlyEnabled(state, ownProps, uischema, schema || rootSchema, rootData, config);
    }
    var errors = formatErrorMessage(union__default["default"](getErrorAt(path, schema)(state).map(function (error) { return error.message; })));
    var isValid = isEmpty__default["default"](errors);
    return {
        data: Resolve.data(rootData, path),
        visible: visible,
        enabled: enabled,
        id: id,
        path: path,
        errors: errors,
        isValid: isValid,
        schema: schema,
        uischema: uischema,
        config: getConfig(state),
        rootSchema: rootSchema,
        renderers: renderers,
        cells: cells
    };
};
var mapStateToDispatchCellProps = function (state, ownProps) {
    var props = mapStateToCellProps(state, ownProps);
    ownProps.renderers; var cells = ownProps.cells, otherOwnProps = __rest(ownProps, ["renderers", "cells"]);
    return __assign(__assign(__assign({}, props), otherOwnProps), { cells: cells || state.jsonforms.cells || [] });
};
var defaultMapStateToEnumCellProps = function (state, ownProps) {
    var _a;
    var props = mapStateToCellProps(state, ownProps);
    var options = ownProps.options ||
        ((_a = props.schema.enum) === null || _a === void 0 ? void 0 : _a.map(function (e) {
            return enumToEnumOptionMapper(e, getTranslator()(state), getI18nKeyPrefix(props.schema, props.uischema, props.path));
        })) ||
        (props.schema.const && [
            enumToEnumOptionMapper(props.schema.const, getTranslator()(state), getI18nKeyPrefix(props.schema, props.uischema, props.path))
        ]);
    return __assign(__assign({}, props), { options: options });
};
var mapStateToOneOfEnumCellProps = function (state, ownProps) {
    var _a;
    var props = mapStateToCellProps(state, ownProps);
    var options = ownProps.options ||
        ((_a = props.schema.oneOf) === null || _a === void 0 ? void 0 : _a.map(function (oneOfSubSchema) {
            return oneOfToEnumOptionMapper(oneOfSubSchema, getTranslator()(state), getI18nKeyPrefix(props.schema, props.uischema, props.path));
        }));
    return __assign(__assign({}, props), { options: options });
};
var mapDispatchToCellProps = mapDispatchToControlProps;
var defaultMapDispatchToControlProps =
function (dispatch, ownProps) {
    var handleChange = mapDispatchToCellProps(dispatch).handleChange;
    return {
        handleChange: ownProps.handleChange || handleChange
    };
};

var createLabel = function (subSchema, subSchemaIndex, keyword) {
    if (subSchema.title) {
        return subSchema.title;
    }
    else {
        return keyword + '-' + subSchemaIndex;
    }
};
var createCombinatorRenderInfos = function (combinatorSubSchemas, rootSchema, keyword, control, path, uischemas) {
    return combinatorSubSchemas.map(function (subSchema, subSchemaIndex) {
        var schema = subSchema.$ref ? Resolve.schema(rootSchema, subSchema.$ref, rootSchema) : subSchema;
        return {
            schema: schema,
            uischema: findUISchema(uischemas, schema, control.scope, path, undefined, control, rootSchema),
            label: createLabel(subSchema, subSchemaIndex, keyword)
        };
    });
};

var usedIds = new Set();
var makeId = function (idBase, iteration) {
    return iteration <= 1 ? idBase : idBase + iteration.toString();
};
var isUniqueId = function (idBase, iteration) {
    var newID = makeId(idBase, iteration);
    return !usedIds.has(newID);
};
var createId = function (proposedId) {
    if (proposedId === undefined) {
        proposedId = 'undefined';
    }
    var tries = 0;
    while (!isUniqueId(proposedId, tries)) {
        tries++;
    }
    var newID = makeId(proposedId, tries);
    usedIds.add(newID);
    return newID;
};
var removeId = function (id) { return usedIds.delete(id); };
var clearAllIds = function () { return usedIds.clear(); };

var getFirstPrimitiveProp = function (schema) {
    if (schema.properties) {
        return find__default["default"](Object.keys(schema.properties), function (propName) {
            var prop = schema.properties[propName];
            return (prop.type === 'string' ||
                prop.type === 'number' ||
                prop.type === 'integer');
        });
    }
    return undefined;
};

var setReadonlyPropertyValue = function (value) { return function (child) {
    if (!child.options) {
        child.options = {};
    }
    child.options.readonly = value;
}; };
var setReadonly = function (uischema) {
    iterateSchema(uischema, setReadonlyPropertyValue(true));
};
var unsetReadonly = function (uischema) {
    iterateSchema(uischema, setReadonlyPropertyValue(false));
};
var iterateSchema = function (uischema, toApply) {
    if (isEmpty__default["default"](uischema)) {
        return;
    }
    if (isLayout(uischema)) {
        uischema.elements.forEach(function (child) { return iterateSchema(child, toApply); });
        return;
    }
    toApply(uischema);
};

var createAjv = function (options) {
    var ajv = new Ajv__default["default"](__assign({ allErrors: true, verbose: true, strict: false }, options));
    addFormats__default["default"](ajv);
    return ajv;
};

var createLayout = function (layoutType) { return ({
    type: layoutType,
    elements: []
}); };
var createControlElement = function (ref) { return ({
    type: 'Control',
    scope: ref
}); };
var wrapInLayoutIfNecessary = function (uischema, layoutType) {
    if (!isEmpty__default["default"](uischema) && !isLayout(uischema)) {
        var verticalLayout = createLayout(layoutType);
        verticalLayout.elements.push(uischema);
        return verticalLayout;
    }
    return uischema;
};
var addLabel = function (layout, labelName) {
    if (!isEmpty__default["default"](labelName)) {
        var fixedLabel = startCase__default["default"](labelName);
        if (isGroup(layout)) {
            layout.label = fixedLabel;
        }
        else {
            var label = {
                type: 'Label',
                text: fixedLabel
            };
            layout.elements.push(label);
        }
    }
};
var isCombinator = function (jsonSchema) {
    return (!isEmpty__default["default"](jsonSchema) &&
        (!isEmpty__default["default"](jsonSchema.oneOf) ||
            !isEmpty__default["default"](jsonSchema.anyOf) ||
            !isEmpty__default["default"](jsonSchema.allOf)));
};
var generateUISchema = function (jsonSchema, schemaElements, currentRef, schemaName, layoutType, rootSchema) {
    if (!isEmpty__default["default"](jsonSchema) && jsonSchema.$ref !== undefined) {
        return generateUISchema(resolveSchema(rootSchema, jsonSchema.$ref, rootSchema), schemaElements, currentRef, schemaName, layoutType, rootSchema);
    }
    if (isCombinator(jsonSchema)) {
        var controlObject = createControlElement(currentRef);
        schemaElements.push(controlObject);
        return controlObject;
    }
    var types = deriveTypes(jsonSchema);
    if (types.length === 0) {
        return null;
    }
    if (types.length > 1) {
        var controlObject = createControlElement(currentRef);
        schemaElements.push(controlObject);
        return controlObject;
    }
    if (currentRef === '#' && types[0] === 'object') {
        var layout_1 = createLayout(layoutType);
        schemaElements.push(layout_1);
        if (jsonSchema.properties && keys__default["default"](jsonSchema.properties).length > 1) {
            addLabel(layout_1, schemaName);
        }
        if (!isEmpty__default["default"](jsonSchema.properties)) {
            var nextRef_1 = currentRef + '/properties';
            Object.keys(jsonSchema.properties).map(function (propName) {
                var value = jsonSchema.properties[propName];
                var ref = nextRef_1 + "/" + encode(propName);
                if (value.$ref !== undefined) {
                    value = resolveSchema(rootSchema, value.$ref, rootSchema);
                }
                generateUISchema(value, layout_1.elements, ref, propName, layoutType, rootSchema);
            });
        }
        return layout_1;
    }
    switch (types[0]) {
        case 'object':
        case 'array':
        case 'string':
        case 'number':
        case 'integer':
        case 'boolean':
            var controlObject = createControlElement(currentRef);
            schemaElements.push(controlObject);
            return controlObject;
        default:
            throw new Error('Unknown type: ' + JSON.stringify(jsonSchema));
    }
};
var generateDefaultUISchema = function (jsonSchema, layoutType, prefix, rootSchema) {
    if (layoutType === void 0) { layoutType = 'VerticalLayout'; }
    if (prefix === void 0) { prefix = '#'; }
    if (rootSchema === void 0) { rootSchema = jsonSchema; }
    return wrapInLayoutIfNecessary(generateUISchema(jsonSchema, [], prefix, '', layoutType, rootSchema), layoutType);
};

var Generate = {
    jsonSchema: generateJsonSchema,
    uiSchema: generateDefaultUISchema,
    controlElement: createControlElement
};

var INIT = 'jsonforms/INIT';
var UPDATE_CORE = "jsonforms/UPDATE_CORE";
var SET_AJV = 'jsonforms/SET_AJV';
var UPDATE_DATA = 'jsonforms/UPDATE';
var UPDATE_ERRORS = 'jsonforms/UPDATE_ERRORS';
var VALIDATE = 'jsonforms/VALIDATE';
var ADD_RENDERER = 'jsonforms/ADD_RENDERER';
var REMOVE_RENDERER = 'jsonforms/REMOVE_RENDERER';
var ADD_CELL = 'jsonforms/ADD_CELL';
var REMOVE_CELL = 'jsonforms/REMOVE_CELL';
var SET_CONFIG = 'jsonforms/SET_CONFIG';
var ADD_UI_SCHEMA = "jsonforms/ADD_UI_SCHEMA";
var REMOVE_UI_SCHEMA = "jsonforms/REMOVE_UI_SCHEMA";
var SET_SCHEMA = "jsonforms/SET_SCHEMA";
var SET_UISCHEMA = "jsonforms/SET_UISCHEMA";
var SET_VALIDATION_MODE = 'jsonforms/SET_VALIDATION_MODE';
var SET_LOCALE = "jsonforms/SET_LOCALE";
var SET_TRANSLATOR = 'jsonforms/SET_TRANSLATOR';
var UPDATE_I18N = 'jsonforms/UPDATE_I18N';
var ADD_DEFAULT_DATA = "jsonforms/ADD_DEFAULT_DATA";
var REMOVE_DEFAULT_DATA = "jsonforms/REMOVE_DEFAULT_DATA";
var init = function (data, schema, uischema, options) {
    if (schema === void 0) { schema = generateJsonSchema(data); }
    return ({
        type: INIT,
        data: data,
        schema: schema,
        uischema: typeof uischema === 'object' ? uischema : generateDefaultUISchema(schema),
        options: options
    });
};
var updateCore = function (data, schema, uischema, options) { return ({
    type: UPDATE_CORE,
    data: data,
    schema: schema,
    uischema: uischema,
    options: options
}); };
var registerDefaultData = function (schemaPath, data) { return ({
    type: ADD_DEFAULT_DATA,
    schemaPath: schemaPath,
    data: data
}); };
var unregisterDefaultData = function (schemaPath) { return ({
    type: REMOVE_DEFAULT_DATA,
    schemaPath: schemaPath
}); };
var setAjv = function (ajv) { return ({
    type: SET_AJV,
    ajv: ajv
}); };
var update = function (path, updater) { return ({
    type: UPDATE_DATA,
    path: path,
    updater: updater
}); };
var updateErrors = function (errors) { return ({
    type: UPDATE_ERRORS,
    errors: errors
}); };
var registerRenderer = function (tester, renderer) { return ({
    type: ADD_RENDERER,
    tester: tester,
    renderer: renderer
}); };
var registerCell = function (tester, cell) { return ({
    type: ADD_CELL,
    tester: tester,
    cell: cell
}); };
var unregisterCell = function (tester, cell) { return ({
    type: REMOVE_CELL,
    tester: tester,
    cell: cell
}); };
var unregisterRenderer = function (tester, renderer) { return ({
    type: REMOVE_RENDERER,
    tester: tester,
    renderer: renderer
}); };
var setConfig = function (config) { return ({
    type: SET_CONFIG,
    config: config
}); };
var setValidationMode = function (validationMode) { return ({
    type: SET_VALIDATION_MODE,
    validationMode: validationMode
}); };
var registerUISchema = function (tester, uischema) {
    return {
        type: ADD_UI_SCHEMA,
        tester: tester,
        uischema: uischema
    };
};
var unregisterUISchema = function (tester) {
    return {
        type: REMOVE_UI_SCHEMA,
        tester: tester
    };
};
var setLocale = function (locale) { return ({
    type: SET_LOCALE,
    locale: locale
}); };
var setSchema = function (schema) { return ({
    type: SET_SCHEMA,
    schema: schema
}); };
var setTranslator = function (translator, errorTranslator) { return ({
    type: SET_TRANSLATOR,
    translator: translator,
    errorTranslator: errorTranslator
}); };
var updateI18n = function (locale, translator, errorTranslator) { return ({
    type: UPDATE_I18N,
    locale: locale,
    translator: translator,
    errorTranslator: errorTranslator
}); };
var setUISchema = function (uischema) { return ({
    type: SET_UISCHEMA,
    uischema: uischema
}); };

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

var Helpers = {
    createLabelDescriptionFrom: createLabelDescriptionFrom,
    convertToValidClassName: convertToValidClassName
};

exports.ADD_CELL = ADD_CELL;
exports.ADD_DEFAULT_DATA = ADD_DEFAULT_DATA;
exports.ADD_RENDERER = ADD_RENDERER;
exports.ADD_UI_SCHEMA = ADD_UI_SCHEMA;
exports.Actions = index;
exports.Draft4 = Draft4;
exports.Generate = Generate;
exports.Helpers = Helpers;
exports.INIT = INIT;
exports.NOT_APPLICABLE = NOT_APPLICABLE;
exports.Paths = Paths;
exports.REMOVE_CELL = REMOVE_CELL;
exports.REMOVE_DEFAULT_DATA = REMOVE_DEFAULT_DATA;
exports.REMOVE_RENDERER = REMOVE_RENDERER;
exports.REMOVE_UI_SCHEMA = REMOVE_UI_SCHEMA;
exports.Resolve = Resolve;
exports.Runtime = Runtime;
exports.SET_AJV = SET_AJV;
exports.SET_CONFIG = SET_CONFIG;
exports.SET_LOCALE = SET_LOCALE;
exports.SET_SCHEMA = SET_SCHEMA;
exports.SET_TRANSLATOR = SET_TRANSLATOR;
exports.SET_UISCHEMA = SET_UISCHEMA;
exports.SET_VALIDATION_MODE = SET_VALIDATION_MODE;
exports.Test = index$1;
exports.UPDATE_CORE = UPDATE_CORE;
exports.UPDATE_DATA = UPDATE_DATA;
exports.UPDATE_ERRORS = UPDATE_ERRORS;
exports.UPDATE_I18N = UPDATE_I18N;
exports.VALIDATE = VALIDATE;
exports.and = and;
exports.categorizationHasCategory = categorizationHasCategory;
exports.cellReducer = cellReducer;
exports.clearAllIds = clearAllIds;
exports.compose = compose;
exports.composePaths = compose;
exports.composeWithUi = composeWithUi;
exports.computeLabel = computeLabel;
exports.configReducer = configReducer;
exports.controlDefaultProps = controlDefaultProps;
exports.convertToValidClassName = convertToValidClassName;
exports.coreReducer = coreReducer;
exports.createAjv = createAjv;
exports.createCleanLabel = createCleanLabel;
exports.createCombinatorRenderInfos = createCombinatorRenderInfos;
exports.createControlElement = createControlElement;
exports.createDefaultValue = createDefaultValue;
exports.createId = createId;
exports.createLabelDescriptionFrom = createLabelDescriptionFrom;
exports.decode = decode;
exports.defaultDataReducer = defaultDataReducer;
exports.defaultErrorTranslator = defaultErrorTranslator;
exports.defaultJsonFormsI18nState = defaultJsonFormsI18nState;
exports.defaultMapDispatchToControlProps = defaultMapDispatchToControlProps;
exports.defaultMapStateToEnumCellProps = defaultMapStateToEnumCellProps;
exports.defaultTranslator = defaultTranslator;
exports.deriveLabelForUISchemaElement = deriveLabelForUISchemaElement;
exports.deriveTypes = deriveTypes;
exports.encode = encode;
exports.enumToEnumOptionMapper = enumToEnumOptionMapper;
exports.errorAt = errorAt;
exports.errorsAt = errorsAt;
exports.evalEnablement = evalEnablement;
exports.evalVisibility = evalVisibility;
exports.extractAjv = extractAjv;
exports.extractData = extractData;
exports.extractDefaultData = extractDefaultData;
exports.extractSchema = extractSchema;
exports.extractUiSchema = extractUiSchema;
exports.fetchErrorTranslator = fetchErrorTranslator;
exports.fetchLocale = fetchLocale;
exports.fetchTranslator = fetchTranslator;
exports.findAllRefs = findAllRefs;
exports.findMatchingUISchema = findMatchingUISchema;
exports.findUISchema = findUISchema;
exports.formatErrorMessage = formatErrorMessage;
exports.formatIs = formatIs;
exports.generateDefaultUISchema = generateDefaultUISchema;
exports.generateJsonSchema = generateJsonSchema;
exports.getAjv = getAjv;
exports.getCells = getCells;
exports.getCombinedErrorMessage = getCombinedErrorMessage;
exports.getConfig = getConfig;
exports.getControlPath = getControlPath;
exports.getData = getData;
exports.getDefaultData = getDefaultData;
exports.getErrorAt = getErrorAt;
exports.getErrorTranslator = getErrorTranslator;
exports.getFirstPrimitiveProp = getFirstPrimitiveProp;
exports.getI18nKey = getI18nKey;
exports.getI18nKeyPrefix = getI18nKeyPrefix;
exports.getI18nKeyPrefixBySchema = getI18nKeyPrefixBySchema;
exports.getLocale = getLocale;
exports.getRenderers = getRenderers;
exports.getSchema = getSchema;
exports.getSubErrorsAt = getSubErrorsAt;
exports.getTranslator = getTranslator;
exports.getUISchemas = getUISchemas;
exports.getUiSchema = getUiSchema;
exports.hasCategory = hasCategory;
exports.hasEnableRule = hasEnableRule;
exports.hasShowRule = hasShowRule;
exports.hasType = hasType;
exports.i18nReducer = i18nReducer;
exports.init = init;
exports.isAllOfControl = isAllOfControl;
exports.isAnyOfControl = isAnyOfControl;
exports.isArrayObjectControl = isArrayObjectControl;
exports.isBooleanControl = isBooleanControl;
exports.isCategorization = isCategorization;
exports.isCategory = isCategory;
exports.isControl = isControl;
exports.isDateControl = isDateControl;
exports.isDateTimeControl = isDateTimeControl;
exports.isDescriptionHidden = isDescriptionHidden;
exports.isEnabled = isEnabled;
exports.isEnumControl = isEnumControl;
exports.isGroup = isGroup;
exports.isInherentlyEnabled = isInherentlyEnabled;
exports.isIntegerControl = isIntegerControl;
exports.isInternationalized = isInternationalized;
exports.isLabelable = isLabelable;
exports.isLabeled = isLabeled;
exports.isLayout = isLayout;
exports.isMultiLineControl = isMultiLineControl;
exports.isNumberControl = isNumberControl;
exports.isNumberFormatControl = isNumberFormatControl;
exports.isObjectArray = isObjectArray;
exports.isObjectArrayControl = isObjectArrayControl;
exports.isObjectArrayWithNesting = isObjectArrayWithNesting;
exports.isObjectControl = isObjectControl;
exports.isOneOfControl = isOneOfControl;
exports.isOneOfEnumControl = isOneOfEnumControl;
exports.isPrimitiveArrayControl = isPrimitiveArrayControl;
exports.isRangeControl = isRangeControl;
exports.isScopable = isScopable;
exports.isScoped = isScoped;
exports.isStringControl = isStringControl;
exports.isTimeControl = isTimeControl;
exports.isVisible = isVisible;
exports.iterateSchema = iterateSchema;
exports.jsonFormsReducerConfig = jsonFormsReducerConfig;
exports.layoutDefaultProps = layoutDefaultProps;
exports.mapDispatchToArrayControlProps = mapDispatchToArrayControlProps;
exports.mapDispatchToCellProps = mapDispatchToCellProps;
exports.mapDispatchToControlProps = mapDispatchToControlProps;
exports.mapDispatchToMultiEnumProps = mapDispatchToMultiEnumProps;
exports.mapStateToAllOfProps = mapStateToAllOfProps;
exports.mapStateToAnyOfProps = mapStateToAnyOfProps;
exports.mapStateToArrayControlProps = mapStateToArrayControlProps;
exports.mapStateToArrayLayoutProps = mapStateToArrayLayoutProps;
exports.mapStateToCellProps = mapStateToCellProps;
exports.mapStateToCombinatorRendererProps = mapStateToCombinatorRendererProps;
exports.mapStateToControlProps = mapStateToControlProps;
exports.mapStateToControlWithDetailProps = mapStateToControlWithDetailProps;
exports.mapStateToDispatchCellProps = mapStateToDispatchCellProps;
exports.mapStateToEnumControlProps = mapStateToEnumControlProps;
exports.mapStateToJsonFormsRendererProps = mapStateToJsonFormsRendererProps;
exports.mapStateToLabelProps = mapStateToLabelProps;
exports.mapStateToLayoutProps = mapStateToLayoutProps;
exports.mapStateToMasterListItemProps = mapStateToMasterListItemProps;
exports.mapStateToMultiEnumControlProps = mapStateToMultiEnumControlProps;
exports.mapStateToOneOfEnumCellProps = mapStateToOneOfEnumCellProps;
exports.mapStateToOneOfEnumControlProps = mapStateToOneOfEnumControlProps;
exports.mapStateToOneOfProps = mapStateToOneOfProps;
exports.moveDown = moveDown;
exports.moveUp = moveUp;
exports.not = not;
exports.oneOfToEnumOptionMapper = oneOfToEnumOptionMapper;
exports.optionIs = optionIs;
exports.or = or;
exports.rankWith = rankWith;
exports.registerCell = registerCell;
exports.registerDefaultData = registerDefaultData;
exports.registerRenderer = registerRenderer;
exports.registerUISchema = registerUISchema;
exports.removeId = removeId;
exports.rendererReducer = rendererReducer;
exports.resolveData = resolveData;
exports.resolveSchema = resolveSchema;
exports.schemaMatches = schemaMatches;
exports.schemaSubPathMatches = schemaSubPathMatches;
exports.schemaTypeIs = schemaTypeIs;
exports.scopeEndIs = scopeEndIs;
exports.scopeEndsWith = scopeEndsWith;
exports.setAjv = setAjv;
exports.setConfig = setConfig;
exports.setLocale = setLocale;
exports.setReadonly = setReadonly;
exports.setSchema = setSchema;
exports.setTranslator = setTranslator;
exports.setUISchema = setUISchema;
exports.setValidationMode = setValidationMode;
exports.showAsRequired = showAsRequired;
exports.subErrorsAt = subErrorsAt;
exports.toDataPath = toDataPath;
exports.toDataPathSegments = toDataPathSegments;
exports.transformPathToI18nPrefix = transformPathToI18nPrefix;
exports.uiTypeIs = uiTypeIs;
exports.uischemaRegistryReducer = uischemaRegistryReducer;
exports.unregisterCell = unregisterCell;
exports.unregisterDefaultData = unregisterDefaultData;
exports.unregisterRenderer = unregisterRenderer;
exports.unregisterUISchema = unregisterUISchema;
exports.unsetReadonly = unsetReadonly;
exports.update = update;
exports.updateCore = updateCore;
exports.updateErrors = updateErrors;
exports.updateI18n = updateI18n;
exports.validate = validate;
exports.withIncreasedRank = withIncreasedRank;
//# sourceMappingURL=jsonforms-core.cjs.js.map
