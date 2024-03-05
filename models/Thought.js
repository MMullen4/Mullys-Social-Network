const { Schema, model, Types } = require('mongoose'); // destructuring library to use Schema and model

const reactionSchema = new Schema({  // will be used as a subdocument within the Thought model
  reactionId: {
    type: Schema.Types.ObjectId,  // tells Mongoose to expect an ObjectId
    default: () => new Types.ObjectId() // creates a unique id
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => timestamp.toLocaleDateString() // gets the date in the format of: 3/26/2021, 9:53:39 PM 
  }
},
  { // closes the toJSON: true option
    toJSON: {  // allows us to use a function to format the data before it gets to the res.json() method
      getters: true 
    }
  }
);

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => timestamp.toLocaleDateString(), // gets the date in the format of: 3/26/2021, 9:53:39 PM 
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [
      reactionSchema // nested schema
    ]
  },
  {
    // closes the virtuals: true option
    toJSON: {
      virtuals: true,
      getters: true // getters allow us to use a function to format the data before it gets to the res.json() method
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
