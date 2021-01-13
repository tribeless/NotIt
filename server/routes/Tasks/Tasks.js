const {
    ApolloError,
} = require('apollo-server-express');
const {Tasks} = require('../../dataSources/models');
const { v4: uuidv4 } = require('uuid');
const moment = require("moment");
const Logger = require('../../utils/logger');

class TasksApi {

    async getAllUsersTasks(user){
        if(!user){
                throw new ApolloError('Please signIn',401);
            }
            try{
            const response = await Tasks.find({authorId:user.id});
            const result = response.map(item=>TasksApi.reducedRecords(item));
            return result;
            }
            catch(e){
               Logger.log(
                'error',
                'Error', {
                    message: e.message
                }
                );
                throw new Error("Could not retrieve your tasks!");
            }
    }

    static reducedRecords(task){
        return {
            message:task.message,
            id:task.id,
            taskType:task.taskType,
            updatedAt:moment(task.updatedAt).format('YYYY-MM-DD')
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
                Logger.log(
                    'error',
                    'Error', {
                        message: e.message
                    }
                );
                throw new Error("Could not add your task!");
            }
    }
    async markAsTask(args,user){
        if(!user){
            throw new ApolloError("Please signIn",401);
        }
        try{
        const {input:{taskType,taskId}} = args;
        await Tasks.updateOne({_id:taskId},{taskType});
        return {
            status:true,
            message:"Successfully updated your taskType"
        }
        }
        catch(e){
            Logger.log(
                'error',
                'Error', {
                    message: e.message
                }
            );
            throw new Error("Unable to update your taskType");
        }
    }
    async updateUserTask(args,user){
        const {input:{taskId,message}} = args;

        if(!user){
            throw new ApolloError('Please signIn',401);
           }
           try{
            await Tasks.updateOne({_id:taskId},{message});
            return {
                status: true,
                message: "Successfully updated your task"
            }
           }
           catch(e){
                Logger.log(
                'error',
                'Error', {
                    message: e.message
                }
                );
            throw new Error("Could not update your task!");
           }
    }

    async deleteUserTask(args,user){
        const {taskId} = args;

        if (!user) {
           throw new ApolloError('Please signIn',401);
            }
            try{
            await Tasks.deleteOne({_id:taskId});
            return  "Successfully deleted your task";   
        }
            catch(e){
                Logger.log(
                'error',
                'Error', {
                    message: e.message
                }
                );
                throw new Error("Could not delete your task!");
            }  
    }
}

module.exports = TasksApi;