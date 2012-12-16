ORDERED_TESTS = test/

test:	
	./node_modules/.bin/mocha $(ORDERED_TESTS) -R spec

coverage:
	./node_modules/.bin/mocha $(ORDERED_TESTS) -R html-cov > coverage.html

.PHONY: test