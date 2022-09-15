import { Store } from './util';
import { JsonFormsCore, JsonFormsCellRendererRegistryEntry, JsonFormsRendererRegistryEntry, JsonFormsUISchemaRegistryEntry } from './reducers';
import { JsonFormsI18nState } from './i18n';
/**
 * JSONForms store.
 */
export interface JsonFormsStore extends Store<JsonFormsState> {
}
/**
 * The state shape of JSONForms.
 */
export interface JsonFormsState {
    /**
     * Represents JSONForm's sub-state.
     */
    jsonforms: JsonFormsSubStates;
}
export interface JsonFormsSubStates {
    /**
     * Substate for storing mandatory sub-state.
     */
    core?: JsonFormsCore;
    /**
     * Global configuration options.
     */
    config?: any;
    /**
     * All available renderers.
     */
    renderers?: JsonFormsRendererRegistryEntry[];
    /**
     * All available cell renderers.
     */
    cells?: JsonFormsCellRendererRegistryEntry[];
    /**
     * I18n settings.
     */
    i18n?: JsonFormsI18nState;
    /**
     * The UI schema registry used in detail renderers.
     */
    uischemas?: JsonFormsUISchemaRegistryEntry[];
    /**
     * If true, sets all controls to read-only.
     */
    readonly?: boolean;
    [additionalState: string]: any;
}
export interface JsonFormsExtendedState<T> extends JsonFormsState {
    jsonforms: {
        [subState: string]: T;
    };
}
