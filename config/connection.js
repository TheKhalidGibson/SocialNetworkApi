const { connect, connection } = require('mongoose');

connect('mongodb://127.0.0.1:27017/socialDB');

module.exports = connection;




// const { connect, connection } = require('mongoose');

// const connectionString =
//   process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB';

// connect(connectionString);

// module.exports = connection;