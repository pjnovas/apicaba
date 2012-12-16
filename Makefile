ORDERED_TESTS = test/

test:	
	node test/testServer/ & 
	sleep 0.1
	./node_modules/.bin/mocha $(ORDERED_TESTS) -R spec
	pkill node

coverage:
	node test/testServer/ & 
	sleep 0.1
	./node_modules/.bin/mocha $(ORDERED_TESTS) -R html-cov > coverage.html
	pkill node

.PHONY: test