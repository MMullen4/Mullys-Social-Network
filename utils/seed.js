const users = require('./data'); // import the user data
const connection = require('../config/connection'); // import the connection to the database
const { User, Thought } = require('../models'); // import the User and Thought models
const { db, collection } = require('../models/User'); // import the User and Thought models
const { connect } = require('mongoose'); // import the mongoose package


connection.once('open', async () => { // open the connection to the database
  console.log('connected');
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  const userSeed = [];
  for (let i = 0; i < 5; i++) { // loop through the user data
    const userName = users[i].username;
    const email = users[i].email;
    userSeed.push({ userName, email }); // push the user data into the userSeed array
  }
  await User.collection.insertMany(userSeed); // insert the users into the database 
  console.table(users);

  process.exit(0);
});
