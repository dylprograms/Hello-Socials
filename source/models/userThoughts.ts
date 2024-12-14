import { Schema, model, type Document } from 'mongoose';
import { formatDate } from '../utils/dateFormating.js';
import reactionSchema from '../models/userReactions.js';

interface IThought extends Document {
  thoughtText: string,
  username: string,
  createdAt: Schema.Types.Date,
  reactions: [typeof reactionSchema]
 }

const thoughtSchema = new Schema<IThought>(
 {
   thoughtText: {
     type: String,
     required: true,
     minlength: 1,
     maxlength: 280
   },
   createdAt: {
     type: Date,
     default: Date.now,
     get: (timestamp:any) => formatDate(timestamp)
   },
   username: {
     type: String,
     required: true
   },
   reactions: [reactionSchema]
 },
 {
   toJSON: {
     getters: true
   },
   timestamps: true,
   id: false
 }
);

thoughtSchema.virtual('reactionCount').get(function() {
 return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;
