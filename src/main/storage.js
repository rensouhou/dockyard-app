/* eslint no-console: 0 */
/**
 * @overview
 *
 * @since 0.1.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @flow
 */
import path from 'path';
import fs from 'fs';
import invariant from 'invariant';
import electron from 'electron';
import rimraf from 'rimraf';
import R from 'ramda';
import chalk from 'chalk';

const app = electron.app || electron.remote.app;
const userData = app.getPath('userData');

type JSON = string | number | boolean | null | JSONObject | JSONArray;
type JSONObject = { [key:string]: JSON };
type JSONArray = Array<JSON>;

const defaultOpts = { encoding: 'utf8' };

const getUserDataPath = ():string => userData;

const getFileName = (file:string):string => {
  invariant(file, 'A file name is required');
  invariant(R.isEmpty((file || '').trim()), '');
  return path.join(getUserDataPath(), `${path.basename(file, '.json')}.json`);
};

/**
 * @param file
 */
export function load(file:string):JSONObject {
  let content;
  try {
    content = fs.readFileSync(getFileName(file), defaultOpts);
  }
  catch (e) {
    if (e.code === 'ENOENT') {
      return JSON.stringify({});
    }
    console.error('error reading file: %s', e.message, e.stack);
    return e;
  }

  return content;
}

/**
 * @param file
 * @param content
 *
 * @example
 * storage.save('derp', { asd: 1, fgh: 2 });
 */
export function save(file:string, content:JSONObject):JSONObject {
  invariant(content, 'Invalid JSON data');
  invariant(file, 'A file name is required');
  const data = JSON.stringify(content);
  const filename = getFileName(file);
  let result;
  let error;
  try {
    fs.writeFileSync(filename, data);
    result = { ...result, successful: true };
  }
  catch (e) {
    error = e;
    result = { ...result, successful: false };
  }
  return { ...result, error };
}

/**
 */
export function has(file:string):boolean {
  try {
    return fs.accessSync(getFileName(file), fs.F_OK);
  }
  catch (e) {
    return false;
  }
}

/**
 */
export function keys():Array<string> {
  const keylist = fs.readdirSync(getUserDataPath());
  const rejector = R.reject(key => ['GPUCache'].includes(key));
  const mapper = R.map(key => path.basename(key, '.json'));
  return R.compose(mapper, rejector)(keylist);
}

/**
 */
export function clear():boolean {
  try {
    rimraf(path.join(getUserDataPath(), '*.json'));
    return true;
  }
  catch (e) {
    console.error(chalk.red.bold());
    return false;
  }
}
