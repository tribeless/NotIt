const {gql} =  require('apollo-server-express');

const typeDefs = gql` 

type Query{
    usersDetails:[UserDetails]!
}

type UserDetails {
    name:String!
    email:String!
}

`

module.exports = typeDefs;

