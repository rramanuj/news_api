import db from './../models';
var mongodb = require('mongodb');

import { callbackify } from 'util';
const movesController = {};


//this one
movesController.getGamesByUser = function (req,res) {
    const {userId} = req.body;
    db.Moves.find({
        player:userId
    }).then((projects) => {
        return res.status(200).json({success:true, data:projects})
        
    }).catch((err) => {
        return res.status(500).json({
            message: err
        });
    })
}

/*.populate({ //populate function uses the reference
        //creator in order to populate further information such as the usernamer etc
        path: 'player',
        //the -_id removes the id field from the postman api pull 
        select: 'username'}).populate({  //you can chain these functions
        //populates must be a path & select combo. 
        }). */
export default movesController;