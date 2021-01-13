const {gql} =  require('apollo-server-express');

const typeDefs = gql` 

enum TaskType{
    new
    inProgress
    completed
}
type Query{
    usersDetails:[UserDetails]!
    usersTasks:[UserTasks]!
    usersDetails:[UserDetails]
    usersTasks(taskType:TaskType!):[UserTasks]!
    userAvatar:Avatar
}

type Mutation{
    signIn(email:String!,password:String!):Result
    signUp(input:UserData!):Result
    signOut:Results
    addTasks(input:InputTasks!):Results!
    updateTask(input:UpdateTasks!):Results
    deleteTask(taskId:String!):String
    singleFile(file:Upload!):Results!
    markAs(input:MarkAsType!):Results!
    deleteTask(taskId:String!):Results!
    singleFile(file:Upload!):Results!
}

type Avatar{
    fileUrl:String
    status:Boolean
}

input MarkAsType{
    taskType:String!
    taskId:String!
}

input UpdateTasks {
    taskId:String!
    message:String!
}
input UserData{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
}
input InputTasks{
    taskType:TaskType!
    message:String!
    authorId:String!
}
type Result{
    status:Boolean
    id:String
}
type UserDetails {
    email:String
    firstName:String
    lastName:String 
    filePath:String
}
type Results{
    status:Boolean!
    message:String!
}
type UserTasks{
    message:String!
    taskType:String!
    id:String!
    updatedAt:String!
}

`

module.exports = typeDefs;

