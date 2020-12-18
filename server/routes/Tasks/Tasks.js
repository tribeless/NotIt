const {
    ApolloError,
} = require('apollo-server-express');
const {Tasks} = require('../../dataSources/models')
const { v4: uuidv4 } = require('uuid');

class TasksApi {

    async getAllUsersTasks(args,user){
        const {taskType} = args;
        if(!user){
                throw new ApolloError('Please signIn',401);
            }
            try{
            return await Tasks.find({authorId:user.id,taskType});
            }
            catch(e){
                throw new Error("Could not retrieve your tasks!");
            }
    }

    async addUsersTask(args,user){
        const {input:{taskType,message,authorId}} = args;

            if (!user) {
                throw new ApolloError('Please signIn',401);
            }
            try {
                const newTask = new Tasks({
                    _id: uuidv4(),
                    taskType,
                    message,
                    authorId
                });

               const response  = newTask.save();
                return {
                    status: true,
                    message: 'Successfully added your task'

                }
            } catch (e) {

                throw new Error("Could not add your task!");
            }
    }

    async updateUserTask(args,user){
        const {input:{taskId,message}} = args;

        if(!user){
            throw new ApolloError('Please signIn',401);
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
           
           }
           catch(e){
            throw new Error("Could not update your task!");
           }
    }

    async deleteUserTask(args,user){
        const {taskId} = args;

        if (!user) {
           throw new ApolloError('Please signIn',401);
            }
            try{
            const response = Tasks.findById({_id:taskId});
            if (response._id) {
            await Tasks.deleteOne({_id:taskId});
            return {
                status: true,
                message: "Successfully deleted your task"
            }
            }
        }
            catch(e){
                throw new Error("Could not delete your task!");
            }  
    }
}

module.exports = TasksApi;