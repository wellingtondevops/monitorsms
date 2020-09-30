const axios = require("axios")
const TotalVoice = require("totalvoice-node")
const client = new TotalVoice("95da4f190342a1ffab9306a733414aed")


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

console.log(process.env.WELLINGTON_TELEPHONE)

setInterval(async function () {
    console.log("Iniciando monitoramento dos Servidores")
    for (const server of servers) {
       await axios({
            url: server.url,
            method: "get"
        }).then((response) => {
            
            console.log(`${server.name} ONLINE!`)
        }).catch(()=>{
            console.log(`${server.name} OFFLINE!`)
        })
    }
    console.log("Finalizando monitoramento dos Servidores")
}, 1000) // 1 segundo
