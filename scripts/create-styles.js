#!/usr/bin/env node
/*eslint no-console:0*/
/**
 * This script parses emojione's sprites css and prints an ES6 module
 * that exports an object that maps each codepoint to its CSS position.
 *
 * Sample output:
 *
 * export default {
 * {'0023-20E3':'2.85714% 0%'},
 * {'0030-20E3':'71.42857% 51.42857%'},
 * {'0031-20E3':'0% 2.85714%'},
 * {'0032-20E3':'2.85714% 2.85714%'},
 * ...
 */
'use strict';

const {readFileSync} = require('fs');
const {basename} = require('path');

const COMMENT = `/*eslint-disable*/
// Do not edit!
// This file was auto-generated by ${basename(__filename)}
`;

const FILENAME = '/../node_modules/emojione/assets/sprites/emojione.sprites.css';
const REGEXP = /\.emojione-([\w-]+)\s*{\s*background-position:\s*([\d\spx-]+)/g;

const css = readFileSync(__dirname + FILENAME).toString().replace(/\n/g, '');

const positions = [];

let match;
while (match = REGEXP.exec(css)) positions.push([
    match[1],
    match[2].trim().split(/\s+/).map(n => parseInt(n)).join(',')
]);

const str = positions.map(p => `'${p[0]}':[${p[1]}]`).join(',\n');

console.log(`${COMMENT}export default {\n${str}};`);