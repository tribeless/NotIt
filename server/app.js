const express = require('express');
const {
    ApolloServer,
} = require('apollo-server-express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const {DB_CONNECTION_URI } = require('./dataSources/configValues');
const Logger = require('./utils/logger');
const expressJwt = require('express-jwt');
const app = express();
const {Users} = require('./dataSources/models');
const {UsersApi,TasksApi,SessionsApi} = require('./routes');


require('dotenv').config();
const configValues = process.env;

async function connectToDatasource() {
    try {
        await mongoose.connect(DB_CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        Logger.log(
            'info',
            'Success',
            {
                message: 'Connected successfully to our datasource'
            }
        )
        console.log('Connected successfully to our datasource');
    } catch (e) {
        Logger.log(
            'error',
            'Error',
            {
                message:'Could not connect, please contact us if problem persists'
            }
        )
       
        throw new Error('Could not connect, please contact us if problem persists');
    }
}

connectToDatasource();
app.use(cookieParser());
app.use(expressJwt({
    secret:configValues.COOKIE_SECRET,
    algorithms:["HS256"],
    getToken: req => req.cookies.jwt,
    credentialsRequired:false
}))

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
       return { 
           usersApi: new UsersApi(),
           sessionsApi:new SessionsApi(),
           tasksApi:new TasksApi()
        }
    },
    context:async({req,connection,res})=>{
    //get token from headers
    if(connection){
        return connection.context;
    }else{
    let user = req.user || "";
    let users;
    if(user) users = await Users.findOne({_id:req.user.id})
      return {users,res}  
    }
      
    },
    formatError:(err)=>({
        message:err.message
    })
});

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(cors({
    origin:configValues.ORIGIN,
    credentials:true
}));


server.applyMiddleware({app,cors:false})


app.listen(configValues.PORT,()=>console.log(`🚀 Server ready at http://localhost:${configValues.PORT}${server.graphqlPath}`));

