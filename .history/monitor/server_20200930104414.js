const axios = require("axios")
const TotalVoice = require("totalvoice-node")
// const client = new TotalVoice(process.env.TOTALVOICE_API_KEY)


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

console.log(developer)

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
