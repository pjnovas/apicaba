ORDERED_TESTS = test/index.js

test:	
	node test/MockGBA/ & 
	sleep 0.1
	./node_modules/.bin/mocha $(ORDERED_TESTS) -R spec
	pkill node

coverage:
	node test/MockGBA/ & 
	sleep 0.1
	./node_modules/.bin/mocha $(ORDERED_TESTS) -R html-cov > coverage.html
	pkill node

.PHONY: test