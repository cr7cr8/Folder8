const express = require("express")
const app = express()
const passport = require("passport")
const {  session } = require("./db/passportConfig");



app.set("view engine", "ejs")
app.use(express.static("./views"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(session)
app.use(passport.initialize())
app.use(passport.session())


const user = require("./routers/user")
app.use("/u",user)







app.listen(process.env.PORT || 80)

