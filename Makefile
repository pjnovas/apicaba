ORDERED_TESTS = test/index.js test/admin/index.js 

test:	
	node ./server.js & 
	node ./test/admin/MockGBA/ & 
	sleep 0.1
	./node_modules/.bin/mocha $(ORDERED_TESTS) -R spec
	pkill node

coverage:
	node ./server.js & 
	node ./test/admin/MockGBA/ & 
	sleep 0.1
	./node_modules/.bin/mocha $(ORDERED_TESTS) --require blanket -R html-cov > coverage.html
	pkill node
	
.PHONY: test