const connection = require('../config/connection');
const { User, Thought } = require('../models'); // import the User and Thought models

// Start the seeding runtime timer
console.time('seeding');

// connect to the database
connection.once('open', async () => {
  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }
  // Empty arrays for randomly generated users and thoughts
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }
  // Empty arrays for randomly generated users and thoughts
  let reactionCheck = await connection.db.listCollections({ name: 'reactions' }).toArray();
  if (reactionCheck.length) {
    await connection.dropCollection('reactions');
  }
  // Empty arrays for randomly generated users and thoughts
  let friendCheck = await connection.db.listCollections({ name: 'friends' }).toArray();
  if (friendCheck.length) {
    await connection.dropCollection('friends');
  }

  // Empty arrays for randomly generated users and thoughts
  const user = [];
  const thought = [];

  // Function to make a thought object and push it into the posts array
  const makeThought = (text) => {
    posts.push({
      published: Math.random() < 0.5,
      text,
      tags: [thought[genRandomIndex(makeThought)]._id],
    });
  };

  // Create 5 random thoughts and push them into the tags array
  for (let i = 0; i < 5; i++) {
    const thoughtText = getRandomPost(5);
    thought.push({
      thoughtText,
      username: user[genRandomIndex(user)].username,
    });

    // Wait for the thoughts to be inserted into the database
    await Thought.collection.insertMany(thought);
  }
},

  // Create 5 random users and push them into the users array
  for (let i = 0; i < 5; i++) {
    const username = getRandomPost(5);
    const email = `${username}@${getRandomPost(5)}.com`;
    user.push({
      username,
      email,
    });

    await User.collection.insertMany(user);
  }
  console.log('Users and thoughts seeded!');

  console.table(thought); // log the thoughts



console.timeEnd('seeding');  // end the seeding runtime timer
process.exit(0); // exit the process
