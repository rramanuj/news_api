import User from './../models/user';
import Project from './Project';
import Comment from './Comment';
import Team from './Team';
import Games from './Games';
import Moves from './Moves';
import Card from './Card';
//instead of having to import 3 or 4 models, we can just import the index file and have
//access to all the models


export default {
    User,
    Games,
    Comment,
    Team,
    Card,
    Moves,
}; 

