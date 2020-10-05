const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

require('dotenv').config();
const configValues = process.env;

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

