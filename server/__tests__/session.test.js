const chai = require("chai");
const mongoose = require('mongoose');
const randomEmail = require('random-email');
const expect = chai.expect;
const {
    signIn,
    signOut,
    signUp,
    addTasks,
    updateTask,
    deleteTask,
    usersTasks,
    usersDetails
} = require("./api");

require("dotenv").config();
const configValues = process.env;

let db;
let signedInUser;

describe("run all tests",()=>{

    before(async () => {
        db = await mongoose.connect(`mongodb+srv://${configValues.PROJECT}:${configValues.PASSWORD}@${configValues.CLUSTER}.pkg2s.mongodb.net/${configValues.DATABASE}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    after(async () => {
        await db.connection.close();
    });

describe("signin user",()=>{
    it("should return status true and login user",async()=>{
        const expectedResult = {
            status:true,
            id: '7985f318-7e2b-4bba-b69f-6602a54bbdec'
        }
    const response = await signIn({email:"brian@gmail.com",password:"M@Tak@s0"});
    expect(response.data.data.signIn).to.eql(expectedResult)
    }).timeout(10000);

    it("should fetch userDetails", async () => {
        const expectedResult = [{
            email: "",
            firstName: "",
            lastName: ""
        }]
        const response = await usersDetails();
        expect(response.data.data.usersDetails).to.deep.equal(expectedResult);
    }).timeout(10000);

    it("should throw an error if not user while fetching user details", async () => {
        const response = await usersDetails();
        const [errors] = response.data.errors;
        expect(errors.message).to.equal("Please signIn");
    }).timeout(10000);

    it("should throw an error if email is not registered",async()=>{
        const response = await signIn({email:"mak@gmail.com",password:"M@Tak@s0"});
        const [errors] = response.data.errors
        expect(errors.message).to.equal("No such email registered");
    }).timeout(10000);

    it("should throw an error if password is incorrect",async()=>{
        const response = await signIn({email:"brian@gmail.com",password:"M@Tak@s000"});
        const [errors] = response.data.errors
        expect(errors.message).to.equal("Invalid credentials");
    }).timeout(10000);

});


describe("signout user",()=>{

    it("should return a status and a message on success",async()=>{
        const expectedResult = {
            status:true,
            message:"successfully logged you out"
        }
        const response = await signOut();
        expect(response.data.data.signOut).to.deep.equal(expectedResult);
    }).timeout(10000);
});

describe("signup user",()=>{

    it("should signup a user",async()=>{
        const expectedResult=true;
        const input = {
            firstName:"Brian",
            lastName:"Kyole",
            email:randomEmail({ domain: 'gmail.com' }),
            password:"M@Tak@s0"
        }
        const response = await signUp({input});
        expect(response.data.data.signUp.status).to.eql(expectedResult);
    }).timeout(10000);

    it("should throw an error if email is already in use",async ()=>{
        const input = {
            firstName:"Brian",
            lastName:"Kyole",
            email:"kkk@gmail.com",
            password:"M@Tak@s0"
        }
        const response = await signUp({input});
        const [errors] = response.data.errors;
        expect(errors.message).to.equal("Email already in use");
    }).timeout(10000);

    it("should throw an error if password is less than eigth characters",async()=>{
        const input = {
            firstName:"Brian",
            lastName:"Kyole",
            email:randomEmail({ domain: 'gmail.com' }),
            password:"M@Tak@"
        }
        const response = await signUp({input});
        const [errors] = response.data.errors;
        expect(errors.message).to.eql("Password length must be greater than 8 characters long")
    }).timeout(10000);
});

describe("user's task",()=>{
    it("should fetch all user's tasks",async()=>{
        const expectedResult = [
            {
                message:"today I have been writing tests",
                id:""
            }
        ]
        const response = await usersTasks({taskType:"new"});
        expect(response.data.data.usersTasks).to.deep.equal(expectedResult);
    }).timeout(10000);

    it("should throw an error if not a user while fetching tasks",async ()=>{
        const response = await usersTasks({taskType:"new"});
        const [errors] = response.data.errors;
        expect(errors.message).to.eql("Please signIn");
    }).timeout(10000);

    it("should add a user's task",async()=>{
        const expectedResult = {
            status:true,
            message:"Successfully added your task"
        }
        const input = {
             taskType:"new",
             message:"today I have been writing tests",
             authorId:"7985f318-7e2b-4bba-b69f-6602a54bbdec"
        }
        const response = await addTasks({input});
        expect(response).to.eql(expectedResult);
    }).timeout(10000);

    it("should throw an error if not logged in while adding user task",async()=>{
        const input = {
            taskType: "new",
            message: "today I have been writing tests",
            authorId: "7985f318-7e2b-4bba-b69f-6602a54bbdec"
        }
        const response = await addTasks({input});
        const [errors] = response.data.errors;
        expect(errors.message).to.eql("Please signIn");
    }).timeout(10000);

    it("should update a user's task",async()=>{
        const expectedResult = {
            status: true,
            message: "Successfully updated your task"
        }
        const input = {
            taskId:"",
            message:"new string for task update"
        }
        const response = await updateTask({input});
        expect(response.data.data.updateTask).to.equal(expectedResult);
    }).timeout(10000);

    it("should throw an error if not a user while updating",async()=>{
        const input = {
            taskId:"",
            message:"new string for task update"
        }
        const response = await addTasks({input});
        const [errors] = response.data.errors;
        expect(errors.message).to.eql("Please signIn");
    }).timeout(10000);

    it("should delete a user's task",async()=>{
        const expectedResult = {
            status: true,
            message: "Successfully deleted your task"
        }
        const response = await deleteTask({taskId:""});
        expect(response.data.data.deleteTask).to.eql(expectedResult);
    }).timeout(10000);

    it("should throw an error if not user while deleting",async()=>{
        const response = await deleteTask({taskId:""});
        const [errors] = response.data.errors;
        expect(errors.message).to.eql("Please signIn");
    }).timeout(10000);

});

});