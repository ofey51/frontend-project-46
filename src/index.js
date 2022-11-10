import { readFileSync } from 'node:fs';
import _ from 'lodash';
import path from 'node:path'

const genDiff = (path1, path2) => {
    const object1 = JSON.parse(readFileSync(path.resolve(path1)));
    const object2 = JSON.parse(readFileSync(path.resolve(path2)));
    const uniqKeys = _.sortBy(_.uniq([...Object.keys(object1), ...Object.keys(object2)]));
    let result = '\n{';
    for (const key of uniqKeys) {
        if (Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
            if (object1[key] === object2[key]) {
                result = `${result}\n    ${key}: ${object1[key]}`
            } else {
                result = `${result}\n  - ${key}: ${object1[key]}\n  + ${key}: ${object2[key]}`
            }
        } else if (Object.hasOwn(object1, key)) {
            result = `${result}\n  - ${key}: ${object1[key]}`;
        } else {
            result = `${result}\n  + ${key}: ${object2[key]}`;
        }
    }
    return result + '\n}'
};

export default genDiff;