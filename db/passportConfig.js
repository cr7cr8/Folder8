const session = require("express-session")
//const passport = require("passport")
const { Strategy } = require("passport-local")
const { secret } = require("./config.js")
const MongoStore = require("connect-mongo")(session)
const mongoose = require("./db")



function passportConfig(passport, verifyUserFunc) {
    passport.use(new Strategy(
        { usernameField: "username", passwordField: "password",passReqToCallback: true  },

        verifyUserFunc


    ))

   
    passport.serializeUser(function (token, passIn) {
        //   console.log("serializing   ", token)
        passIn(null, token)

    })
    passport.deserializeUser(function (token, fetchOut) {
        //   console.log("deserializing   ", token)
        fetchOut(null, token)
    })
}



module.exports = {

    passportConfig: passportConfig,
    session: session(
        {
            secret: secret,
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({ mongooseConnection: mongoose.connection }),
            cookie: {}
        }
    )
};