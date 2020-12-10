const chai = require("chai");
const expect = chai.expect;
const {signIn,signOut} = require("./api");


describe("user login",()=>{

    it("should return status true and login user",async()=>{
        const expectedResult = {
            status:true,
            id: '7985f318-7e2b-4bba-b69f-6602a54bbdec'
        }
    const response = await signIn({email:"brian@gmail.com",password:"M@Tak@s0"});
    expect(response.data.data.signIn).to.eql(expectedResult)
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


describe("signOut",()=>{

    it("should return a status and a message on success",async()=>{
        const expectedResult = {
            status:true,
            message:"successfully logged you out"
        }
        const response = await signOut();
        expect(response.data.data.signOut).to.deep.equal(expectedResult);
    }).timeout(10000);
});

// describe("signUp",()=>{

//     it("should signup a user",async()=>{
//         const expectedResult = {
//             status:true,
//             id:""
//         }
//         const userData = {
//             firstName:"Brian",
//             lastName:"Kyole",
//             email:"abc@gmail.com",
//             password:"M@Tak@s0"
//         }
//         const response = await signUp(input:{userData});
//         console.log(response.data.data.signUp);
//         expect(response.data.data.signUp).to.eql(expectedResult);
//     }).timeout(10000);
// });

// describe("addTasks",()=>{

//     it("should add a users task",async()=>{
//         const expectedResult = {
//             status:true,
//             message:"Successfully added your task"
//         }

//         const response = await addTasks(input);
//         console.log(response.data.data.addTasks);
//         expext(response).to.eql(expectedResult);
//     }).timeout(10000);
// })