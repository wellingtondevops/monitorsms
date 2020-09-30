const http = require("http")

http.createServer((req,res)=>{
    res.write("Server2")
    res.end()
}).listen(4002)