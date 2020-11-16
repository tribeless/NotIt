const {Tasks} = require('../../dataSources/models')
const { v4: uuidv4 } = require('uuid');

class TasksApi {

    async getAllUsersTasks(args,user,res){
        const {taskType} = args;
        if(!user){
            res.status(401).send();
                throw new Error('Please signIn')
            }
            return await Tasks.find({authorId:user.id,taskType});
    }

    async addUsersTask(args,user,res){
        const {input:{taskType,message,authorId}} = args;

            if (!user) {
                res.status(401).send();
                throw new Error('Please sign in to perform this action');
            }
            try {
                const newTask = new Tasks({
                    _id: uuidv4(),
                    taskType,
                    message,
                    authorId
                });

                newTask.save();

                return {
                    status: true,
                    message: 'Successfully added your task'

                }
            } catch (e) {

                return {
                    status: false,
                    message: "Could not add your task"
                }
            }
    }

    async updateUserTask(args,user,res){
        const {input:{taskId,message}} = args;

        if(!user){
            res.status(401).send();
               throw new Error('Please signIn to perfom this action');
           }
           try{
           const response = Tasks.findById({_id:taskId});
           
           if(response._id){
            await Tasks.updateOne({_id:taskId},{message});
            return {
                status: true,
                message: "Successfully updated your task"
            }
           }
           else{
               
               return {
                   status: false,
                   message: "Cannot update, no task by that id found"
               }
           }
           
           }
           catch(e){

           }
    }

    async deleteUserTask(args,user,res){
        const {taskId} = args;

        if (!user) {
            res.status(401).send();
                throw new Error('Please signIn to perfom this action');
            }
            try{
            const response = Tasks.findById({_id:taskId});
            if (response._id) {
            await Tasks.deleteOne({_id:taskId});
            return {
                status: true,
                message: "Successfully deleted your task"
            }
            }else{
                return {
                    status: false,
                    message: "Cannot delete, no task by that id found"
                }
            }
            }
            catch(e){
                
            }  
    }
}

module.exports = TasksApi;