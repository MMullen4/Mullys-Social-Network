const users = require('./data');
const connection = require('../config/connection');
const { User, Thought } = require('../models'); // import the User and Thought models
const { db } = require('../models/User');
const { connect } = require('mongoose');


connection.once('open', async () => {
  console.log('connected');
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await User.deleteMany('users');
  }
  
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await Thought.deleteMany('thoughts');
  }

  const users = [];

  process.exit(0);
});
