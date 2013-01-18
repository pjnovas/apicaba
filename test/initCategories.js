var mongoJS = require('mongojs')
  secrets = require('../secrets.json');

app = {
  db: mongoJS.connect(
        secrets.mongodb.connectionString, 
        ['jobs', 'categories', 'groups', 'resources']),

  server: "http://localhost:3000/",
  secrets: secrets
};

require('./createCategories.js')();