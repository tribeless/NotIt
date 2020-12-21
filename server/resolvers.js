
//REMEMBER TO HANDLE THIS ERRO
// UnauthorizedError: jwt expired 
//say if(error.name===UnauthorizedError){Please login in}

const resolvers = {
    Query:{
       usersDetails:async (_,__,{dataSources,users})=>{return dataSources.usersApi.getSignedUserDetails(users);},
       usersTasks:async(_,args,{dataSources,users})=>{return dataSources.tasksApi.getAllUsersTasks(args,users);},
       userAvatar:async(_,__,{dataSources,users})=>{return dataSources.uploadsApi.retrieveAvatar(users)}
    },
    Mutation:{
       signUp:async(_,args,{ dataSources})=>{return dataSources.usersApi.addUsers(args);},
       signIn:async(_,args,{dataSources,res})=>{return dataSources.sessionsApi.signInUser(args,res);},
       addTasks:async(_,args,{dataSources,users})=>{return dataSources.tasksApi.addUsersTask(args,users);},
       updateTask:async(_,args,{dataSources,users})=>{return dataSources.tasksApi.updateUserTask(args,users);},
       deleteTask:async(_,args,{dataSources,users})=>{return dataSources.tasksApi.deleteUserTask(args,users);},
       signOut:async(_,__,{dataSources,res})=>{return dataSources.sessionsApi.logOut(res);},
       singleFile:async(_,args,{dataSources,users})=>{return dataSources.uploadsApi.uploadUserFile(users,args)}
    }
}

module.exports = resolvers; 
