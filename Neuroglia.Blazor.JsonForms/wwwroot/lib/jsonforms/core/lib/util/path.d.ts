import { Scopable } from '../models';
export declare const compose: (path1: string, path2: string) => string;
export { compose as composePaths };
/**
 * Convert a schema path (i.e. JSON pointer) to an array by splitting
 * at the '/' character and removing all schema-specific keywords.
 *
 * The returned value can be used to de-reference a root object by folding over it
 * and de-referencing the single segments to obtain a new object.
 *
 *
 * @param {string} schemaPath the schema path to be converted
 * @returns {string[]} an array containing only non-schema-specific segments
 */
export declare const toDataPathSegments: (schemaPath: string) => string[];
/**
 * Remove all schema-specific keywords (e.g. 'properties') from a given path.
 * @example
 * toDataPath('#/properties/foo/properties/bar') === '#/foo/bar')
 *
 * @param {string} schemaPath the schema path to be converted
 * @returns {string} the path without schema-specific keywords
 */
export declare const toDataPath: (schemaPath: string) => string;
export declare const composeWithUi: (scopableUi: Scopable, path: string) => string;
/**
 * Encodes the given segment to be used as part of a JSON Pointer
 *
 * JSON Pointer has special meaning for "/" and "~", therefore these must be encoded
 */
export declare const encode: (segment: string) => string;
/**
 * Decodes a given JSON Pointer segment to its "normal" representation
 */
export declare const decode: (pointerSegment: string) => string;
