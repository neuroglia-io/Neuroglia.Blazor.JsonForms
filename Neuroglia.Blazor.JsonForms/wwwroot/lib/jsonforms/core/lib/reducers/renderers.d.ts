import { RankedTester } from '../testers';
import { AddRendererAction, RemoveRendererAction } from '../actions';
import { Reducer } from '../util';
export interface JsonFormsRendererRegistryEntry {
    tester: RankedTester;
    renderer: any;
}
declare type ValidRendererReducerActions = AddRendererAction | RemoveRendererAction;
export declare const rendererReducer: Reducer<JsonFormsRendererRegistryEntry[], ValidRendererReducerActions>;
export {};
