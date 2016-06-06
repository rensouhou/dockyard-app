/* eslint no-param-reassign: 0, camelcase: 0, no-underscore-dangle: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @flow
 */
import { Material } from '../../types/kcsapi';
import { getArrayOrDefault } from '../primitive';
import { Materials } from '../../records';
import R from 'ramda';

const _ = R.__;

type MaterialsObject = {
  fuel: number,
  ammo: number,
  steel: number,
  bauxite: number,
  instantConstruction?: number,
  instantRepair?: number,
  developmentMaterials?: number,
  improvementMaterials?: number
};

/** @private */
const materials:Array<string> = [
  'fuel', 'ammo', 'steel', 'bauxite', 'instantConstruction', 'instantRepair', 'developmentMaterials',
  'improvementMaterials'
];

/** @private */
const matIntoPair = R.map(({ api_id, api_value }:Material):[number, number] => [api_id, api_value]);

/** @private */
const fixMatKey = R.map(([i, v]:[number, number]):[string, number] => [materials[i - 1], v]);

/** @private */
const tightFilterPred = R.allPass([
  R.complement(R.isNil),
  R.is(Number)
]);

/** @private */
const tightFilter = R.filter(tightFilterPred);

/** @private */
const zipMats = R.zipObj(materials);

/**
 * @type {Function}
 * @returns {Dockyard.Materials}
 * @example
 * let mats = [100, 100, 200, 50];
 * let matObj = parseMaterialArray(mats);
 * console.log(matObj); // => { fuel: 100, ammo: 100, steel: 200, bauxite: 50 }
 */
export const parseMaterialArray:MaterialsObject =
  (arr) => R.compose(tightFilter, zipMats)(getArrayOrDefault(arr));

/**
 * @type {Function}
 * @returns {Dockyard.Materials}
 * @example
 * let createMaterial = (id, val, ?memberId) => { api_id: id, api_value: val, api_member_id: memberId };
 * let mats = [
 *   createMaterial(1, 100),
 *   createMaterial(2, 100),
 *   createMaterial(3, 200),
 *   createMaterial(4, 50)
 * ];
 * let matObj = parseMaterialObjects(mats);
 * console.log(matObj); // => { fuel: 100, ammo: 100, steel: 200, bauxite: 50 }
 */
export const parseMaterialObjects:MaterialsObject =
  R.compose(R.fromPairs, fixMatKey, matIntoPair);

/**
 * Composes a {@link Dockyard.Materials} object with {@link parseMaterialArray}
 * and filters out all falsy values. For use mainly with construction recipes.
 * Uses {@link materials} index for values.
 *
 * @type {Function}
 * @returns {Dockyard.Materials}
 * @example
 * let matObj = parseMaterialsRecipe([100, 100, 200, 50, null, null, 20]);
 * console.log(matObj); // => { fuel: 100, ammo: 100, steel: 200, bauxite: 50, developmentMaterials: 20 }
 */
export const parseMaterialsRecipe:MaterialsObject =
  R.compose(R.pickBy((k, v) => !R.isNil(v)), parseMaterialArray);

/**
 * Convenience function for @see {@link parseMaterialsRecipe}
 *
 * @type {Function}
 * @returns {Dockyard.Materials}
 */
export const parseRecipe:MaterialsObject = R.curry(parseMaterialsRecipe)(_, _, _, _, null, null, _);

/**
 * @param obj
 * @returns {records.js~Materials}
 */
export const asRecord = (obj) => new Materials(obj);
