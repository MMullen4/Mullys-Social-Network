const { connect, connection } = require('mongoose');

connect('mongodb://127.0.0.1:27017/postsTags'); // connect to the local MongoDB database called postsTags

module.exports = connection;
