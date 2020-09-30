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
        name: "Workfy Produção",
        url: "http://localhost:4001",
        developer: {
            name: "Wellington Carvalho de Oliveira",
            telephone: process.env.WELLINGTON_TELEPHONE
        }
    },
    {
        name: "Server 2",
        url: "http://localhost:4002",
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
        name: "Testes Archio",
        url: "https://apiqa.archio.com.br",
        developer: {
            name: "Wellington Carvalho de Oliveira",
            telephone: process.env.WELLINGTON_TELEPHONE
        }
    },
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
            client.sms.enviar(process.env.WELLINGTON_TELEPHONE, `O servidor ${server.name} está fora do ar!,`)
                .then(function (data) {
                    console.log(data)
                })
                .catch(function (error) {
                    console.error('Erro: ', error)
                });
        })
    }
    console.log("Finalizando monitoramento dos Servidores")
}, 1000 * 10) // 1 segundo

