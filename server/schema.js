const {gql} =  require('apollo-server-express');

const typeDefs = gql` 

enum TaskType{
    new
    inProgress
    Completed
}
type Query{
    usersDetails:[UserDetails]
    usersTasks(taskType:TaskType!):[UserTasks]!
}

type Mutation{
    signIn(email:String!,password:String!):Result
    signUp(input:UserData!):Result
    signOut:Results
    addTasks(input:InputTasks!):Results!
}
type Result{
    token:String!
    status:Boolean
    id:String
}
type UserDetails {
    email:String
    firstName:String
    lastName:String 
}

type Results{
    status:Boolean!
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
    authorId:String
}
type UserTasks{
    message:String
}
 
`

module.exports = typeDefs;

