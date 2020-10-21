const Users = require('./dataSources/models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const configValues = process.env;

const resolvers = {
    Query:{
        usersDetails:async (_,{users},context)=>{
        console.log(context.users)
            if(!context.users){
                throw new Error('Please signIn')
            }
            
            return await Users.find({_id:context.users.id});
        }
    },
    Mutation:{
        signUp:async(_,{input:{firstName,lastName,email,password}},context)=>{
          
            const response = await Users.findOne({email:email});
        
            if(response){
              throw new Error('Email already in use')
               
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
            const token = jwt.sign({email:user.email,id:user.id},configValues.SECRET,{expiresIn: '1d'});
            context.user = token;
            return token;
           
        },
        signIn:async(_,{email,password},context)=>{

             const response =  await Users.findOne({email:email})

             if(!response){

                throw new Error('No such email registered')
             
             }

             const match = await bcrypt.compare(password,response.password);

             if(!match){
                throw new Error('Invalid credentials')
             }

             const token= jwt.sign({email:response.email,id:response.id},configValues.SECRET,{expiresIn: '1d'});
             context.user = token;
             return token;

                
        },
       
             
    }
    
}

module.exports = resolvers; 
