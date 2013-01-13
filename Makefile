ORDERED_TESTS = test/index.js test/admin/index.js 

test:	
	NODE_ENV=test node ./server.js & 
	NODE_ENV=test node ./test/admin/MockGBA/ & 
	sleep 0.1
	NODE_ENV=test ./node_modules/.bin/mocha $(ORDERED_TESTS) -R spec
	pkill node

coverage:
	NODE_ENV=test node ./server.js & 
	NODE_ENV=test node ./test/admin/MockGBA/ & 
	sleep 0.1
	NODE_ENV=test ./node_modules/.bin/mocha $(ORDERED_TESTS) --require blanket -R html-cov > coverage.html
	pkill node
	
.PHONY: test