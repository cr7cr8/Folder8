const bcrypt = require("bcryptjs")
const mongoose = require("../db/db")
const { userSchema } = require("../db/schema")
const User = mongoose.model("user_model", userSchema)
const passport = require("passport")
const { passportConfig } = require("../db/passportConfig");

//const RegStra = require("passport-local-register").Strategy

//console.log(RegStra);
passportConfig(passport, verifyUserFunc)



const nameField = Object.keys(userSchema.tree)[0];
const passwordField = Object.keys(userSchema.tree)[1];

User.find({}).count().exec().then(count=>{

    if (count>10){
        User.db.dropCollection(userSchema.get("collection")).then(function(){
            const { testusers } = require("../db/config");
            testusers.forEach(function (u) {
                u.password = bcrypt.hashSync(u.password, 10)
            })
            User.create(testusers).then(function (u) {

            })
        })
    }

})







function verifyUserFunc(req, nameToVerify, passowrdToVerify, done) {
    console.log(req.path)

    User.findOne({ [nameField]: nameToVerify }).exec().then(function (u) {
        if (req.path === "/login") {
            if (!u) {

                return done(null, false, { message: "no user with that email" })
            }
            else {

                bcrypt.compare(passowrdToVerify, u.password).then(equal => {

                    return equal ? done(null, u) : done(null, false, { message: "password incorrect" })
                }).catch(e => {
                    return done(e)
                })
            }
        }
        else if (req.path === "/register") {
            if (u){
                return done(null, false, { message: "user already registed" })
            }
            else{

                User.create({
                    [nameField]: nameToVerify,
                    [passwordField]: bcrypt.hashSync(passowrdToVerify)
                }).then(u=>{
                    done(null, u);
                }).catch(e=>{

                    done(e)
                })

            }
        }
    })


};


function loginUserFunc() {


    return passport.authenticate("local", { successRedirect: "/u", failureRedirect: "/u/login", failureFlash: true })
}




function registerUserFunc() {



   
    return passport.authenticate("local", { successRedirect: "/u", failureRedirect: "/u/register", failureFlash: true })

   
}



module.exports = { User: User, loginUserFunc: loginUserFunc, registerUserFunc: registerUserFunc }





