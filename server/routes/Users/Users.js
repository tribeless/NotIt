const {Users} = require('../../dataSources/models')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const configValues = process.env;

class UsersApi{

    async addUsers(args){
        const {
            input: {
                firstName,
                lastName,
                email,
                password
            }
        } = args;

         const response = await Users.findOne({email:email});
        
            if(response){
              throw new Error('Email already in use')
               
            }
            
            if(password.length < 8){
                throw new Error('Password length must be greater than 8 characters long');
            }

             const newUser = new Users({
                 _id:uuidv4(),
                 firstName,
                 lastName,
                 email,
                 password
             });

            const hash = await bcrypt.hash(password, 10);
            
    
            newUser.password = hash;
            const user = await newUser.save();
            const token = jwt.sign({email:user.email,id:user._id},configValues.SECRET,{expiresIn: '1d'});
            //this.context.users = token;
            return {
                token,
                status:true,
                id:user._id
            };
    }

    async getSignedUserDetails(user){
        
        if(!user){
                throw new Error('Please signIn')
            }
            
        return await Users.find({_id:user._id});
    }
}

module.exports = UsersApi;