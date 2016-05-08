/// <reference path="../../lib/typedefs/kancolle.d.ts" />
/// <reference path="../../lib/typedefs/dockyard.d.ts" />
/*eslint no-confusing-arrow:0*/
/**
 * @overview
 *  Convenience functions for mapping and filtering API data into
 *  primitives.
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/primitive
 * @flow
 */

export const getArrayOrDefault = (arr:Array):Array => arr || [];
export const getObjectOrDefault = (obj:Object):Object => obj || {};
export const asNumber = (num:any):number => !isNaN(parseInt(num, 10)) ? parseInt(num, 10) : null;
export const asBool = (n:number):boolean => asNumber(n) === 1;
export const notEmpty = (n:number):boolean => asNumber(n) !== -1;
export const formatLineBreaks = (s:string):string => (s || '').replace(/<br\s?\/?>/gi, '\n');
