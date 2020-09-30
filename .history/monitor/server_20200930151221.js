const axios = require("axios")
const TotalVoice = require("totalvoice-node")
require('dotenv/config')
const client = new TotalVoice(process.env.TOTALVOICE_API_KEY)

const boss = {
    name: "Alguém",
    telephone: process.env.BOSS
}


const servers = [
    {
        name: "API DE UPLOADS",
        url: "https://archioqa.appspot.com",
        developer: {
            name: "Wellington Carvalho de Oliveira",
            telephone: process.env.WELLINGTON_TELEPHONE
        }
    }, 
    {
        name: "API DE UPLOADS",
        url: "https://archioqa.appspot.com",
        developer: {
            name: "Wellington Carvalho de Oliveira",
            telephone: process.env.WELLINGTON_TELEPHONE
        }
    },     
    {
        name: "Produção Archio",
        url: "https://api.archio.com.br",
        developer: {
            name: "Wellington Carvalho de Oliveira",
            telephone: process.env.WELLINGTON_TELEPHONE
        }
    },
    {
        name: "API de Archio",
        url: "https://apiqa.archio.com.br",
        developer: {
            name: "Wellington Carvalho de Oliveira",
            telephone: process.env.WELLINGTON_TELEPHONE
        }
    }   
]

const notifications = [

]
setInterval(async function () {
    console.log("Iniciando monitoramento dos Servidores")
    for (const server of servers) {
        await axios({
            url: server.url,
            method: "get"
        }).then((response) => {
            console.log(`${server.name} ONLINE!`)
        }).catch(() => {
            
             client.sms.enviar(process.env.WELLINGTON_TELEPHONE, `${server.developer.name} fica esperto que os servidor ${server.name} caiu!`)
                .then(function (data) {
                    console.log(data)
                })
                .catch(function (error) {
                    console.error('Erro: ', error)
                });
        })
    }
    console.log("Finalizando monitoramento dos Servidores")
}, 1000 * 60) // 1 segundo

