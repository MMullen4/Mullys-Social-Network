  
const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({  // will be used as a subdocument
  reactionId: {
    type: Schema.Types.ObjectId,
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
  {
    toJSON: {
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
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);
    
    thoughtSchema.virtual('reactionCount').get(function () {
      return this.reactions.length;
    });
  
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
