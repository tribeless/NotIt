const mongoose = require('mongoose');

const {Schema,model} = mongoose;

const TaskSchema = new Schema({
    taskType:{
        type:String,
        required:true
    },
    subject:{
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

const Tasks = model('Tasks',TaskSchema);

module.exports = Tasks;