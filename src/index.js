import { readFileSync } from 'node:fs';
import _ from 'lodash';
import path from 'node:path'

const genDiff = (path1, path2) => {
    const object1 = JSON.parse(readFileSync(path.resolve(path1)));
    const object2 = JSON.parse(readFileSync(path.resolve(path2)));
    const key1 = _.keys(object1);
    const key2 = _.keys(object2);
    const uniqKeys = _.uniq([...key1, ...key2]).sort();
    let result = '\n{';
    for (const key of uniqKeys) {
        if (key1.includes(key) && key2.includes(key)) {
            if (object1[key] === object2[key]) {
                result = `${result}\n    ${key}: ${object1[key]}`
            } else {
                result = `${result}\n  - ${key}: ${object1[key]}\n  + ${key}: ${object2[key]}`
            }
        } else if (key1.includes(key)) {
            result = `${result}\n  - ${key}: ${object1[key]}`;
        } else {
            result = `${result}\n  + ${key}: ${object2[key]}`;
        }
    }
    return result + '\n}'
};

export default genDiff;