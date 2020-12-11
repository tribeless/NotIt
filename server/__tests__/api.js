const axios = require("axios");
require("dotenv").config();
const configValues = process.env;

const url = `${configValues.TEST_URL}/graphql`;

const signIn = async variables =>
await axios.post(url,{
    query:`
        mutation signIn($email:String!,$password:String!){
            signIn(email:$email,password:$password){
                status
                id
            }
        }
    `,
    variables
});

const usersDetails = async variables =>
await axios.post(url,{
    query:`
        query{
            usersDetails{
                email
                firstName
                lastName
            }
        }
    `
})

const signOut = async variables =>
await axios.post(url,{
    query:`
        mutation signOut{
            signOut{
                status
                message
            }
        }
    `,
    variables
});

const signUp = async variables=>
await axios.post(url,{
    query:`
        mutation signUp($input: UserData!){
            signUp(input:$input){
                status 
                id
            }
        }
    `,
    variables
});

const addTasks = async (variables,user) =>
await axios.post(url,{
    query:`
        mutation addTasks($input: InputTasks!){
            addTasks(input:$input){
                status
                message
            }
        }
    `,
    variables
},
 user
      ? {
          user: {
            'user': user,
          },
        }
      : null,
);

const updateTask = async (variables)=>
await axios.post(url,{
    query:`
        mutation updateTask($input:UpdateTasks!){
            updateTask(input:$input){
                status
                message
            }
        }
    `,
    variables
});

const deleteTask = async variables =>
await axios.post(url,{
    query:`
        mutation deleteTask($taskId:String!){
            deleteTask(taskId:$taskId){
                status
                message
            }
        }
    `,
    variables
});

const usersTasks = async variables =>
await axios.post(url,{
    query:`
        query usersTasks($taskType:String!){
            usersTasks(taskType:$taskType){
                message
                id
            }
        }
    `,
    variables
});

module.exports={
    signIn,
    signOut,
    signUp,
    addTasks,
    updateTask,
    deleteTask,
    usersTasks,
    usersDetails
}