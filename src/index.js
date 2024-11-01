import { readFileSync } from 'node:fs';
import _ from 'lodash';
import path from 'node:path';

const genDiff = (path1, path2) => {
  const obj1 = JSON.parse(readFileSync(path.resolve(path1)));
  const obj2 = JSON.parse(readFileSync(path.resolve(path2)));

  const unsortedUniqKeys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
  const uniqKeys = _.sortBy(unsortedUniqKeys);
  const diff = uniqKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return value1 === value2
        ? `\n    ${key}: ${value1}`
        : `\n  - ${key}: ${value1}\n  + ${key}: ${value2}`;
    }
    return key in obj1 ? `\n  - ${key}: ${value1}` : `\n  + ${key}: ${value2}`;
  });

  return `\n{${diff.join('')}\n}`;
};

export default genDiff;
