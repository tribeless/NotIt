const user = require('./data');

const resolvers = {
    Query:{
        usersDetails:()=>user
    }
}

module.exports = resolvers;