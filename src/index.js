import _ from 'lodash';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import parsers from './parsers.js';

const getJsonFormatFile = (filePath) => {
  const extension = path.extname(filePath).slice(1);
  const parser = parsers[extension];
  const data = readFileSync(filePath);
  return parser(data);
};

const getDiffLine = (key, value1, value2) => {
  if (value1 === value2) {
    return `\n    ${key}: ${value1}`;
  }
  return `\n  - ${key}: ${value1}\n  + ${key}: ${value2}`;
};

const getKeyDiff = (key, obj1, obj2) => {
  const value1 = obj1[key];
  const value2 = obj2[key];

  if (key in obj1 && key in obj2) {
    return getDiffLine(key, value1, value2);
  }
  return key in obj1 ? `\n  - ${key}: ${value1}` : `\n  + ${key}: ${value2}`;
};

const genDiff = (path1, path2) => {
  const obj1 = getJsonFormatFile(path1);
  const obj2 = getJsonFormatFile(path2);

  const uniqKeys = _.sortBy(
    _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]),
  );
  const diff = uniqKeys.map((key) => getKeyDiff(key, obj1, obj2));

  return `\n{${diff.join('')}\n}`;
};

export default genDiff;
