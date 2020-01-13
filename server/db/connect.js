const monk = require('monk');
const connection = process.env.MONGODB_URI || 'localhost/mymessageboard';
const db = monk(connection);

module.exports = db;