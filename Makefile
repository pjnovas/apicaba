ORDERED_TESTS = test/core.js

test:	
	./node_modules/.bin/mocha $(ORDERED_TESTS) -R spec

coverage:
	./node_modules/.bin/mocha $(ORDERED_TESTS) -R html-cov > coverage.html

.PHONY: test