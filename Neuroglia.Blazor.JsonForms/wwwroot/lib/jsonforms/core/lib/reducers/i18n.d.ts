import { JsonFormsI18nState } from '../i18n';
import { I18nActions } from '../actions';
import { Reducer } from '../util';
export declare const defaultJsonFormsI18nState: Required<JsonFormsI18nState>;
export declare const i18nReducer: Reducer<JsonFormsI18nState, I18nActions>;
export declare const fetchLocale: (state?: JsonFormsI18nState) => string;
export declare const fetchTranslator: (state?: JsonFormsI18nState) => import("../i18n").Translator;
export declare const fetchErrorTranslator: (state?: JsonFormsI18nState) => import("../i18n").ErrorTranslator;
