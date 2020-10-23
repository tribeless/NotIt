const Users = require('./dataSources/models/Users');
const Tasks = require('./dataSources/models/Tasks');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

//REMEMBER TO HANDLE THIS ERRO
// UnauthorizedError: jwt expired 

require('dotenv').config();
const configValues = process.env;

const resolvers = {
    Query:{
        usersDetails:async (_,{users},context)=>{
        
            if(!context.users){
                throw new Error('Please signIn')
            }
            
            return await Users.find({_id:context.users.id});
        },
        usersTasks:async(_,{taskType},context)=>{
            if(!context.users){
                throw new Error('Please signIn')
            }
            return await Tasks.find({authorId:context.users.id,taskType});
        }
    },
    Mutation:{
        signUp:async(_,{input:{firstName,lastName,email,password}},context)=>{
          
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
            context.user = token;
            return {
                token,
                status:true,
                id:user._id
            };
           
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

             const token= jwt.sign({email:response.email,id:response._id},configValues.SECRET,{expiresIn: '1d'});
             context.user = token;
             return {
                 token,
                 status:true,
                 id:response._id
                };

                
        },
       addTasks:async(_,{input:{taskType,message,authorId}},context)=>{

        if(!context.users){
            throw new Error('Please sign in to perform this action');
        }
        try{
            const newTask  = new Tasks({
                _id:uuidv4(),
                taskType,
                message,
                authorId
            });

            newTask.save();

            return {
                status:true,
                message:'Successfully added your task'

            }
        }
        catch(e){
            console.log(e.message);
            return {
                status:false,
                message:"Could not add your task"
            }
        }
       }
             
    }
    
}

module.exports = resolvers; 
