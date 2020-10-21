const {gql} =  require('apollo-server-express');

const typeDefs = gql` 

type Query{
    usersDetails:[UserDetails]
}

type Mutation{
    signIn(email:String!,password:String!):String
    signUp(input:UserData):String
    signOut:Results
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

 
`

module.exports = typeDefs;

