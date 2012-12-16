ORDERED_TESTS = test/

test:	
	node test/testServer/ & 
	sleep 0.1
	./node_modules/.bin/mocha $(ORDERED_TESTS) -R spec

coverage:
	node test/testServer/ & 
	sleep 0.1
	./node_modules/.bin/mocha $(ORDERED_TESTS) -R html-cov > coverage.html

.PHONY: test