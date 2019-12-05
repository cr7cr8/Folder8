const mongoose = require("mongoose");
const Joi = require("joi");



///////////////////////////////////////////////////////////


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique:false
    },

/*
    email: {
        type: String,
        //required: true,
        unique: false,
        minlength: 3,
        maxlength: 250
    },
*/
    password: {
        type: String,
        required: true,

        minlength: 3,
        maxlength: 1024
    }


}, { timestamps: true ,collection:"users"})

userSchema.methods = {
    showCollectionName:()=>{console.log(this)},
    showTheCollectionName:function(){console.log(this)}

}


userSchema.statics = {

    joiValidate: function (obj) {
       

        const schema = {
            name: Joi.string().min(5).max(255).required(),
            email: Joi.string().min(5).max(255).email(),
            password: Joi.string().min(5).max(1024).required()

        }
        return Joi.validate(obj, schema)
    },
    authValidate: function (obj) {
       

        const schema = {

            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(1024).required()

        }
        return Joi.validate(obj, schema)



    }

}





module.exports.userSchema = userSchema