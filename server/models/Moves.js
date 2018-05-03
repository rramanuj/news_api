import mongoose from 'mongoose';
//defines everything that goes inside a collection
const { Schema } = mongoose;
mongoose.Promise = global.Promise;


//first instance of our schema, this is for the user accounts.
const movesSchema = new Schema({
   player: {type: Schema.ObjectId, ref: 'User'},
   startPos: Number,
   endPos: Number,
   moveNo: Number
});





//This Pre function serves 2 purposes: 
// 1. As with the other models, it pre populates the user ID with the user name
// 2. It automatically sets the first person in the team member to be the person who created the team.


const Moves = mongoose.model('Moves', movesSchema);
export default Moves;


