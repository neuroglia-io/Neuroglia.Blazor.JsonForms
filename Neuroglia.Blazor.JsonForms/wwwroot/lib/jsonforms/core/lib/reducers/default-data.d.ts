import { RegisterDefaultDataAction, UnregisterDefaultDataAction } from '../actions';
import { Reducer } from '../util';
export interface JsonFormsDefaultDataRegistryEntry {
    schemaPath: string;
    data: any;
}
declare type ValidDefaultDataActions = RegisterDefaultDataAction | UnregisterDefaultDataAction;
export declare const defaultDataReducer: Reducer<JsonFormsDefaultDataRegistryEntry[], ValidDefaultDataActions>;
export declare const extractDefaultData: (state: JsonFormsDefaultDataRegistryEntry[]) => JsonFormsDefaultDataRegistryEntry[];
export {};
