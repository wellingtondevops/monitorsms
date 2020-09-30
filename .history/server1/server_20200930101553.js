const http = require("http")

http.createServer((req,res)=>{
    res.write("Server1")
    res.end()
}).listen(4001)