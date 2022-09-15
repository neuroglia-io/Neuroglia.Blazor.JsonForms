import AJV, { ErrorObject } from 'ajv';
import { JsonSchema, UISchemaElement } from '../models';
import { RankedTester } from '../testers';
import { UISchemaTester, ValidationMode } from '../reducers';
import { ErrorTranslator, Translator } from '../i18n';
export declare const INIT: 'jsonforms/INIT';
export declare const UPDATE_CORE: 'jsonforms/UPDATE_CORE';
export declare const SET_AJV: 'jsonforms/SET_AJV';
export declare const UPDATE_DATA: 'jsonforms/UPDATE';
export declare const UPDATE_ERRORS: 'jsonforms/UPDATE_ERRORS';
export declare const VALIDATE: 'jsonforms/VALIDATE';
export declare const ADD_RENDERER: 'jsonforms/ADD_RENDERER';
export declare const REMOVE_RENDERER: 'jsonforms/REMOVE_RENDERER';
export declare const ADD_CELL: 'jsonforms/ADD_CELL';
export declare const REMOVE_CELL: 'jsonforms/REMOVE_CELL';
export declare const SET_CONFIG: 'jsonforms/SET_CONFIG';
export declare const ADD_UI_SCHEMA: 'jsonforms/ADD_UI_SCHEMA';
export declare const REMOVE_UI_SCHEMA: 'jsonforms/REMOVE_UI_SCHEMA';
export declare const SET_SCHEMA: 'jsonforms/SET_SCHEMA';
export declare const SET_UISCHEMA: 'jsonforms/SET_UISCHEMA';
export declare const SET_VALIDATION_MODE: 'jsonforms/SET_VALIDATION_MODE';
export declare const SET_LOCALE: 'jsonforms/SET_LOCALE';
export declare const SET_TRANSLATOR: 'jsonforms/SET_TRANSLATOR';
export declare const UPDATE_I18N: 'jsonforms/UPDATE_I18N';
export declare const ADD_DEFAULT_DATA: 'jsonforms/ADD_DEFAULT_DATA';
export declare const REMOVE_DEFAULT_DATA: 'jsonforms/REMOVE_DEFAULT_DATA';
export declare type CoreActions = InitAction | UpdateCoreAction | UpdateAction | UpdateErrorsAction | SetAjvAction | SetSchemaAction | SetUISchemaAction | SetValidationModeAction;
export interface UpdateAction {
    type: 'jsonforms/UPDATE';
    path: string;
    updater(existingData?: any): any;
}
export interface UpdateErrorsAction {
    type: 'jsonforms/UPDATE_ERRORS';
    errors: ErrorObject[];
}
export interface InitAction {
    type: 'jsonforms/INIT';
    data: any;
    schema: JsonSchema;
    uischema: UISchemaElement;
    options?: InitActionOptions | AJV;
}
export interface UpdateCoreAction {
    type: 'jsonforms/UPDATE_CORE';
    data?: any;
    schema?: JsonSchema;
    uischema?: UISchemaElement;
    options?: InitActionOptions | AJV;
}
export interface InitActionOptions {
    ajv?: AJV;
    validationMode?: ValidationMode;
    additionalErrors?: ErrorObject[];
}
export interface SetValidationModeAction {
    type: 'jsonforms/SET_VALIDATION_MODE';
    validationMode: ValidationMode;
}
export declare const init: (data: any, schema?: JsonSchema, uischema?: UISchemaElement, options?: InitActionOptions | AJV) => {
    type: "jsonforms/INIT";
    data: any;
    schema: JsonSchema;
    uischema: UISchemaElement;
    options: InitActionOptions | AJV;
};
export declare const updateCore: (data: any, schema: JsonSchema, uischema?: UISchemaElement, options?: AJV | InitActionOptions) => UpdateCoreAction;
export interface RegisterDefaultDataAction {
    type: 'jsonforms/ADD_DEFAULT_DATA';
    schemaPath: string;
    data: any;
}
export declare const registerDefaultData: (schemaPath: string, data: any) => {
    type: "jsonforms/ADD_DEFAULT_DATA";
    schemaPath: string;
    data: any;
};
export interface UnregisterDefaultDataAction {
    type: 'jsonforms/REMOVE_DEFAULT_DATA';
    schemaPath: string;
}
export declare const unregisterDefaultData: (schemaPath: string) => {
    type: "jsonforms/REMOVE_DEFAULT_DATA";
    schemaPath: string;
};
export interface SetAjvAction {
    type: 'jsonforms/SET_AJV';
    ajv: AJV;
}
export declare const setAjv: (ajv: AJV) => {
    type: "jsonforms/SET_AJV";
    ajv: AJV;
};
export declare const update: (path: string, updater: (existingData: any) => any) => UpdateAction;
export declare const updateErrors: (errors: ErrorObject[]) => UpdateErrorsAction;
export interface AddRendererAction {
    type: 'jsonforms/ADD_RENDERER';
    tester: RankedTester;
    renderer: any;
}
export declare const registerRenderer: (tester: RankedTester, renderer: any) => {
    type: "jsonforms/ADD_RENDERER";
    tester: RankedTester;
    renderer: any;
};
export interface AddCellRendererAction {
    type: 'jsonforms/ADD_CELL';
    tester: RankedTester;
    cell: any;
}
export declare const registerCell: (tester: RankedTester, cell: any) => {
    type: "jsonforms/ADD_CELL";
    tester: RankedTester;
    cell: any;
};
export interface RemoveCellRendererAction {
    type: 'jsonforms/REMOVE_CELL';
    tester: RankedTester;
    cell: any;
}
export declare const unregisterCell: (tester: RankedTester, cell: any) => {
    type: "jsonforms/REMOVE_CELL";
    tester: RankedTester;
    cell: any;
};
export interface RemoveRendererAction {
    type: 'jsonforms/REMOVE_RENDERER';
    tester: RankedTester;
    renderer: any;
}
export declare const unregisterRenderer: (tester: RankedTester, renderer: any) => {
    type: "jsonforms/REMOVE_RENDERER";
    tester: RankedTester;
    renderer: any;
};
export interface SetConfigAction {
    type: 'jsonforms/SET_CONFIG';
    config: any;
}
export declare const setConfig: (config: any) => SetConfigAction;
export declare const setValidationMode: (validationMode: ValidationMode) => SetValidationModeAction;
export declare type UISchemaActions = AddUISchemaAction | RemoveUISchemaAction;
export interface AddUISchemaAction {
    type: 'jsonforms/ADD_UI_SCHEMA';
    tester: UISchemaTester;
    uischema: UISchemaElement;
}
export declare const registerUISchema: (tester: UISchemaTester, uischema: UISchemaElement) => AddUISchemaAction;
export interface RemoveUISchemaAction {
    type: 'jsonforms/REMOVE_UI_SCHEMA';
    tester: UISchemaTester;
}
export declare const unregisterUISchema: (tester: UISchemaTester) => RemoveUISchemaAction;
export declare type I18nActions = SetLocaleAction | SetTranslatorAction | UpdateI18nAction;
export interface SetLocaleAction {
    type: 'jsonforms/SET_LOCALE';
    locale: string | undefined;
}
export declare const setLocale: (locale: string | undefined) => SetLocaleAction;
export interface SetSchemaAction {
    type: 'jsonforms/SET_SCHEMA';
    schema: JsonSchema;
}
export declare const setSchema: (schema: JsonSchema) => SetSchemaAction;
export interface SetTranslatorAction {
    type: 'jsonforms/SET_TRANSLATOR';
    translator?: Translator;
    errorTranslator?: ErrorTranslator;
}
export declare const setTranslator: (translator?: Translator, errorTranslator?: ErrorTranslator) => SetTranslatorAction;
export interface UpdateI18nAction {
    type: 'jsonforms/UPDATE_I18N';
    locale: string | undefined;
    translator: Translator | undefined;
    errorTranslator: ErrorTranslator | undefined;
}
export declare const updateI18n: (locale: string | undefined, translator: Translator | undefined, errorTranslator: ErrorTranslator | undefined) => UpdateI18nAction;
export interface SetUISchemaAction {
    type: 'jsonforms/SET_UISCHEMA';
    uischema: UISchemaElement;
}
export declare const setUISchema: (uischema: UISchemaElement) => SetUISchemaAction;
