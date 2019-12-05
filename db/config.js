const config = {

    url: "mongodb+srv://boss:ABCabc123@cluster0-iiqnu.azure.mongodb.net/Express-Session?retryWrites=true&w=majority",

    secret: "session private key",

    testusers: [{name:"bob",password:"bbb"},    
                {name:"jack",password:"jjj"},
                {name:"tom",password:"ttt"}

    ]

}

module.exports = config