const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const {DB_CONNECTION_URI } = require('./dataSources/configValues');
const Logger = require('./utils/logger');

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

const server = new ApolloServer({
    typeDefs,
    resolvers
});


const app = express();
app.use(express.json());
app.use(cors({
    origin:configValues.ORIGIN.split(',')
}));
server.applyMiddleware({app})


app.listen(configValues.PORT,()=>console.log(`🚀 Server ready at http://localhost:${configValues.PORT}${server.graphqlPath}`));

