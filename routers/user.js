const express = require("express")
const router = express.Router()
const methodOverride = require("method-override")
const flash = require("express-flash")
const { loginUserFunc,registerUserFunc} = require("../models/user")

router.use(flash())
router.use(methodOverride("_method"))

let count = 0
router.get("/login", checkNotAuthenticated,function (req, res) {
    res.render("login",{Port:process.env.PORT||80,count:count++})
})

router.post("/login",loginUserFunc())

router.get("/register", checkNotAuthenticated,function (req, res) {
    res.render("register",{Port:process.env.PORT||80,count:count++})
})

router.post("/register", registerUserFunc()) 
   


router.get("/", checkAuthenticated,function (req, res) {

    if (req.user) {
        const forwarded = req.headers['x-forwarded-for']
        const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
        req.session.passport.user.ip = ip;

        res.render("home", { Username: req.user.name, Session: req.session, Obj: req.user  ,Port:process.env.PORT||80,count:count++})
    }
    else {
        res.send(req.session)
    }
})

router.delete("/logout", function (req, res) {  req.logOut();res.redirect("/u/login")})



function checkAuthenticated(req, res, next) {
    req.isAuthenticated() ? next() : res.redirect("/u/login")
}

function checkNotAuthenticated(req, res, next) {
    req.isAuthenticated() ? res.redirect("/u") : next()
}






module.exports = router