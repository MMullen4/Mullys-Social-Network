const users = require('./data');
const connection = require('../config/connection');
const { User, Thought } = require('../models'); // import the User and Thought models
const { db, collection } = require('../models/User');
const { connect } = require('mongoose');


connection.once('open', async () => {
  console.log('connected');
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }
  
  // let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  // if (thoughtCheck.length) {
  //   await Thought.deleteMany('thoughts');
  // }

  const userSeed = [];
  for (let i = 0; i < 5; i++) {
    const userName = users[i].username;
    const email = users[i].email;
    userSeed.push({ userName, email }); // push the user data into the userSeed array
  }
  await User.collection.insertMany(userSeed); // insert the users into the database 
  console.table(users);

  process.exit(0);
});
