const mongoose = require('mongoose');

const {Schema,model} = mongoose;

const TaskSchema = new Schema({
    _id:{
    type:String,
    required:true,
    },
    taskType:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    authorId:{
        type:Schema.Types.String,
        ref:'Users'
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