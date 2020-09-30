const axios = require("axios")

const servers = [
    {
        name:"Server 1",
        url:"http://localhost:4001",
        developer:{
            name: "Wellington Carvalho de Oliveira",
            telephone: process.env.WELLINGTON_TELEPHONE
        }
    },
    {
        name:"Server 2",
        url:"http://localhost:4002",
        developer:{
            name: "Wellington Carvalho de Oliveira",
            telephone: process.env.WELLINGTON_TELEPHONE
        }
    }
]

for (const server of servers){
    axios({
        url:server.url,
        method:"get"
    }).then((response)=>{
        console.log(response.data)
    })
}