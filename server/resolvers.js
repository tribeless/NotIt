
//REMEMBER TO HANDLE THIS ERRO
// UnauthorizedError: jwt expired 
//say if(error.name===UnauthorizedError){Please login in}

const resolvers = {
    Query:{
       usersDetails:async (_,__,{dataSources,users})=>{return dataSources.usersApi.getSignedUserDetails(users);},
       usersTasks:async(_,args,{dataSources,users})=>{return dataSources.tasksApi.getAllUsersTasks(args,users);}
    },
    Mutation:{
       signUp:async(_,args,{ dataSources})=>{return dataSources.usersApi.addUsers(args);},
       signIn:async(_,args,{dataSources})=>{return dataSources.sessionsApi.signInUser(args);},
       addTasks:async(_,args,{dataSources,users})=>{return dataSources.tasksApi.addUsersTask(args,users);},
       updateTask:async(_,args,{dataSources,users})=>{return dataSources.tasksApi.updateUserTask(args,users);},
       deleteTask:async(_,args,{dataSources,users})=>{return dataSources.tasksApi.deleteUserTask(args,users);}  
    }
}

module.exports = resolvers; 
