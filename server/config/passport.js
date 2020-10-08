const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../dataSources/models');

module.exports = (passport) =>{

passport.use(new LocalStrategy({
usernameField:'email'
} ,async (email,password,done)=>{
        await User.findOne({email:email},(err,user)=>{
            if(err){
                return done;
            }

            if(!user){
                return done(null,false,{message:'Email is not recognized, please register'})
            }

            //passwords
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err){
                    throw new Error('Passwords do not match, please enter a correct password')
                    
                }
                if(!isMatch){
                    return done(null, false,{message:'Passwords do not match, please enter a correct password'})
                }

                return done(null,user)
            })
            
        })
    }
));

passport.serializeUser(async (user,done)=>{
    await done(null,user.id)
});

passport.deserializeUser(async (id,done)=>{
    await User.findById(id,(err,user)=>{
        done(err,user)
    })
})
}


