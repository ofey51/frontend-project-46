import { readFileSync } from 'node:fs';
import _ from 'lodash';
import path from 'node:path'

const genDiff = (path1, path2) => {
    const object1 = JSON.parse(readFileSync(path.resolve(path1)));
    const object2 = JSON.parse(readFileSync(path.resolve(path2)));
    const uniqKeys = _.sortBy(_.uniq([...Object.keys(object1), ...Object.keys(object2)]));
    const diff = uniqKeys.map((key) => {
        const property = `${key}: ${object1[key]}`;
        if (Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
            return object1[key] === object2[key] ? `\n    ${property}` : `\n  - ${property}\n  + ${property}`;
        } else if (Object.hasOwn(object1, key)) {
            return `\n  - ${property}`;
        } else {
            return `\n  + ${property}`;
        }
    });
    
    return `\n{${diff}\n}`;
};

export default genDiff;