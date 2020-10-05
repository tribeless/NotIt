const mongoose = require('mongoose');

const {Schema,model} = mongoose;

const UserSchema = new Schema({
    firstName:{
        type:String,
        required:truncate,
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true});

const Users = model('Users',UserSchema);

module.exports = Users;