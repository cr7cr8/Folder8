const http = require("http");
const bcrypt = require("bcryptjs")

let count =0



http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(`all my Hello World   ! 
    ${count}
    ${new Date().toLocaleString("cn-CN", { timeZone: 'Asia/Shanghai' }) }
    `);
    res.write(bcrypt.hashSync(Date.now().toString(),10))
    res.end();
    count++;
  }).listen(process.env.PORT || 80);