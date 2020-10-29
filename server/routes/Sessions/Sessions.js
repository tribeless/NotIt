const {Users} = require('../../dataSources/models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();
const configValues = process.env;

class SessionsApi {

    async signInUser(args){
        const {email,password} = args;

        const response =  await Users.findOne({email:email})

             if(!response){

                throw new Error('No such email registered')
             
             }

             const match = await bcrypt.compare(password,response.password);

             if(!match){
                throw new Error('Invalid credentials')
             }

             const token= jwt.sign({email:response.email,id:response._id},configValues.SECRET,{expiresIn: '1d'});
            //  context.user = token;
             return {
                 token,
                 status:true,
                 id:response._id
                };

    }
}

module.exports = SessionsApi;