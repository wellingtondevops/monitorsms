const axios = require("axios")
const TotalVoice = require("totalvoice-node")
require('dotenv/config')
const client = new TotalVoice(process.env.TOTALVOICE_API_KEY)



const servers = [        
    {
        name: "API PRODUÇÃO ARCHIO",
        url: "https://api.archio.com.br",
        developer: {
            name: "Wellington",
            telephone: process.env.WELLINGTON_TELEPHONE
        }
    },
    {
        name: "API TESTES ARCHIO",
        url: "https://apiqa.archio.com.br",
        developer: {
            name: "Wellington",
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
             client.sms.enviar(process.env.WELLINGTON_TELEPHONE, `${server.developer.name} aqui é o GORPO,  fica esperto que os servidor ${server.name} caiu!, SE FOI VOCÊ QUE DESLIGOU ANDA LOGO TA GASTANDO CREDITOS DO TOTAL VOICE RSRSR.`)
                .then(function (data) {
                    console.log(data)
                })
                .catch(function (error) {
                    console.error('Erro: ', error)
                });
        })
    }
    console.log("Finalizando monitoramento dos Servidores")
}, 1000 ) // 1 segundo

