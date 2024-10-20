gendiff:
	node ./bin/gendiff.js

lint:
	npx eslint .

fix:
	npx eslint --fix .

test:
	npx jest