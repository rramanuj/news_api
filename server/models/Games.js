import mongoose from 'mongoose';
//defines everything that goes inside a collection
const { Schema } = mongoose;
mongoose.Promise = global.Promise;


//first instance of our schema, this is for the user accounts.
const gamesSchema = new Schema({

    /*ObjectId player1, char symbol1, ObjectId player2, char symbol2) {
    collection = database.getCollectiom*/
   player1: {type: Schema.ObjectId, ref: 'User'},
   player1symbol: String,
   player2: {type: Schema.ObjectId, ref: 'User'},
   player2symbol: String,
   completed: Boolean,
   winner: {type: Schema.ObjectId, ref: 'User'},
   numMoves: Number   //array to hold all the comments pertaining to a specific post
});





//This Pre function serves 2 purposes: 
// 1. As with the other models, it pre populates the user ID with the user name
// 2. It automatically sets the first person in the team member to be the person who created the team.


const Games = mongoose.model('Games', gamesSchema);
export default Games;


