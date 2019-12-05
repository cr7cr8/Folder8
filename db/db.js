const mongoose = require("mongoose")
const {url} = require("./config.js")

//console.log(url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then((mongoose) => {

        console.log("From db---db.js  connected")
    })
    .catch(e=>{

        console.log("From db---db.js  connection error",e)
    })







module.exports = mongoose