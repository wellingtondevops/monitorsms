const axios = require("axios")
const TotalVoice = require("totalvoice-node")
require('dotenv/config')
const client = new TotalVoice(process.env.TOTALVOICE_API_KEY)


const servers = [
    {
        name: "Server 1",
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

const notifications=[

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
            console.log(`${server.name} OFFLINE!`)
            const message = `${server.developer.name} o ${server.name} está fora do ar faço algo o quanto antes. 
            Digite um se você vai fazer alguma coisa, ou dois se não pode fazer nada!`
            const options = {
                velocidade: 2,
                tipo_voz: "br-Vitoria",
                reposta_usuario:true
            }
            client.tts.enviar(server.developer.telephone, message,options).then((response)=>{
                console.log(`O desenvolvedor ${server.developer.name}já foi avisado` )
                console.log(response)
                notifications.push({
                    id:response.dados.id,
                    server,
                    status: "pending"
                })
            })
        })
    }
    console.log("Finalizando monitoramento dos Servidores")
 },10000) // 1 segundo

setInterval(function(){
    for (const notification of notifications){
        if(notifications.status==="pending"){
            client.tts.buscar(notification.id).then(function(response){
                console.log(response)
            })
        }

    }
},5000)
