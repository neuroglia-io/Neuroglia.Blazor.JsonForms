import { RankedTester } from '../testers';
import { AddCellRendererAction, RemoveCellRendererAction } from '../actions';
import { Reducer } from '../util';
declare type ValidCellReducerActions = AddCellRendererAction | RemoveCellRendererAction;
export declare type JsonFormsCellRendererRegistryState = JsonFormsCellRendererRegistryEntry[];
export interface JsonFormsCellRendererRegistryEntry {
    tester: RankedTester;
    cell: any;
}
export declare const cellReducer: Reducer<JsonFormsCellRendererRegistryState, ValidCellReducerActions>;
export {};
