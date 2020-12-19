
//REMEMBER TO HANDLE THIS ERRO
// UnauthorizedError: jwt expired 
//say if(error.name===UnauthorizedError){Please login in}

const resolvers = {
    Query:{
       usersDetails:async (_,__,{dataSources,users,res})=>{return dataSources.usersApi.getSignedUserDetails(users);},
       usersTasks:async(_,args,{dataSources,users,res})=>{return dataSources.tasksApi.getAllUsersTasks(args,users);}
    },
    Mutation:{
       signUp:async(_,args,{ dataSources})=>{return dataSources.usersApi.addUsers(args);},
       signIn:async(_,args,{dataSources,res})=>{return dataSources.sessionsApi.signInUser(args,res);},
       addTasks:async(_,args,{dataSources,users,res})=>{return dataSources.tasksApi.addUsersTask(args,users);},
       updateTask:async(_,args,{dataSources,users,res})=>{return dataSources.tasksApi.updateUserTask(args,users);},
       deleteTask:async(_,args,{dataSources,users,res})=>{return dataSources.tasksApi.deleteUserTask(args,users);},
       signOut:async(_,__,{dataSources,res})=>{return dataSources.sessionsApi.logOut(res);}
    }
}

module.exports = resolvers; 
