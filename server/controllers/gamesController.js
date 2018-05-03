import db from './../models';
var mongodb = require('mongodb');

import { callbackify } from 'util';
const gamesController = {};

//this is going to be a post, because we're creating a post.
gamesController.post= (req,res) => {
    const {
        title,
        text,
        link,
        team,
        userId //token
    } = req.body;
//validation is required, either text or link not both. 
    const game = new db.Games({
        //es 25 shorthand, we don;t need to add the property namne with it
        title,
        text,
        link,
        _creator: userId,       //since the property name is difeferent we need to specificy the 
                                ///parameter name.
    });
    game.save().then((newProject)=>{
        return res.status(200).json({
            success:true,
            data: newProject
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err
        });
    })
};


//pulls from our request body.

//flag as delete
gamesController.dropProject = function(req,res) {
const {projectId} = req.body;
db.Game.findByIdAndUpdate(projectId,
    { $set: {isDeleted:true} }
    ).then((project) => {
    res.status(200).json({
        success: true,
        data: true,
        data: project,
    });
}).catch((err)=>{       //throws err if not 
    res.status(500).json ({
        message: err,
    });
});
}


gamesController.searchTitle = function (req,res) {
    const {userId, query} = req.body;
    db.Game.find({
        _team:userId,  title: { $regex: query } }
    ).then((projects) => {
        return res.status(200).send({
            data:projects
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err
        });
    })
},


gamesController.addMember = (req,res) => {  
    const {userId, projectId} = req.body;
    
    //pulls from our request body.

    //Validation
    //user cursor, we can create a new instance of this model
    
    //update
    db.Game.findByIdAndUpdate(projectId,
        { $push: {'_team': userId} }
        ).then((newMember) => {
        res.status(200).json({
            success: true,
            data: true,
            data: newMember,
        });
    }).catch((err)=>{       //throws err if not 
        res.status(500).json ({
            message: err,
        });
    });
}
gamesController.removeMember = (req,res) => {
    const {userId, projectId} = req.body;
    db.Game.findByIdAndUpdate(projectId,
        { $pull: {'_team': userId} }
        ).then((newMember) => {
        res.status(200).json({
            success: true,
            data: true,
            data: newMember,
        });
    }).catch((err)=>{       //throws err if not 
        res.status(500).json ({
            message: err,
        });
    });
},
//getTeam
gamesController.getTeam = function (req,res) {
    const {projectId} = req.body;
    db.Game.find({
        _id:projectId}, {_team:1}
    ).then((projects) => {
        return res.status(200).send({
            data:projects
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err
        });
    })
},
//this one
gamesController.getGamesByUser = function (req,res) {
    const {userId} = req.body;
    db.Games.find({
        "$or": [{
            "player1": userId
        }, {
            "player2": userId
        }]
    }).populate({ //populate function uses the reference
        //creator in order to populate further information such as the usernamer etc
        path: 'player1',
        //the -_id removes the id field from the postman api pull 
        select: 'username'}).populate({  //you can chain these functions
        //populates must be a path & select combo. 
        path: 'player2', //we only need the text here as the middleware
        //we implemented automatically extracts the _user from the id 
        select: 'username'}).then((projects) => {
        return res.status(200).json({success:true, data:projects})
        
    }).catch((err) => {
        return res.status(500).json({
            message: err
        });
    })
},

gamesController.getById = (req,res)=>{
    const {projectId} = req.body;
    db.Game.find({
        _id:projectId
    }).populate({ //populate function uses the reference
        //creator in order to populate further information such as the usernamer etc
        path: '_creator',
        //the -_id removes the id field from the postman api pull 
        select: 'username createdAt'}).populate({  //you can chain these functions
        //populates must be a path & select combo. 
        path: '_comments', //we only need the text here as the middleware
        //we implemented automatically extracts the _user from the id 
        select: 'text',
      /*  path: '_team', //we only need the text here as the middleware
        //we implemented within the respective controller file automatically extracts the _user from the id.
        select: 'username _id',*/
        match: {'isDeleted': false}}).then((projects) => {
        return res.status(200).send({
            data:projects
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err
        });
    })
},
//
gamesController.getAll = (req,res)=>{
    db.Games.find({}).then((games) => {
        return res.status(200).json({
            success:true,
            data:games
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err
        });
    })
}

export default gamesController;