import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genfidd from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gendiff', () => {
  const fixture = readFileSync(
    `${__dirname}/../__fixtures__/file.txt`,
    'utf-8',
  );
  expect(
    genfidd(path.resolve('./src/file1.json'), path.resolve('./src/file2.json')),
  ).toEqual(fixture);
});
