const connection = require('../config/connection');
const { User, Thought } = require('../models');
// Import functions for seed data
// const { getRandomColor, getRandomPost, genRandomIndex } = require('./data');

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }
  let reactionCheck = await connection.db.listCollections({ name: 'reactions' }).toArray();
  if (reactionCheck.length) {
    await connection.dropCollection('reactions');
  }
  let friendCheck = await connection.db.listCollections({ name: 'friends' }).toArray();
  if (friendCheck.length) {
    await connection.dropCollection('friends');
  }

  // Empty arrays for randomly generated users and thoughts
  const user = [];
  const thought = [];

  // Function to make a post object and push it into the posts array
  const makePost = (text) => {
    posts.push({
      published: Math.random() < 0.5,
      text,
      tags: [tags[genRandomIndex(tags)]._id],
    });
  };

  // Create 20 random tags and push them into the tags array
  for (let i = 0; i < 20; i++) {
    const tagname = getRandomColor();

    tags.push({
      tagname,
      color: tagname,
    });
  }

  // Wait for the tags to be inserted into the database
  await Tags.collection.insertMany(tags);

  // For each of the tags that exist, make a random post of length 50
  tags.forEach(() => makePost(getRandomPost(50)));

  // Wait for the posts array to be inserted into the database
  await Post.collection.insertMany(posts);

  // Log out a pretty table for tags and posts, excluding the excessively long text property
  console.table(tags);
  console.table(posts, ['published', 'tags', '_id']);
  console.timeEnd('seeding');
  process.exit(0);
});
