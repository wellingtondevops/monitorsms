const axios = require("axios")
const TotalVoice = require("totalvoice-node")
require('dotenv/config')
const client = new TotalVoice(process.env.TOTALVOICE_API_KEY)

const boss ={
    name:"Alguém",
    telephone: process.env.BOSS
}


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
                // console.log(response)
                notifications.push({
                    id:response.dados.id,
                    server,
                    status: "pending"
                })
            })
        })
    }
    console.log("Finalizando monitoramento dos Servidores")
  },1000) // 1 segundo

setInterval(function(){
    for (const notification of notifications){
        if(notifications.status==="pending"){
            client.tts.buscar(notification.id).then(function(response){
                if (response.dados.resposta ==="1"){
                    console.log(`O desenvolvedor ${notification.server.developer.name}já foi avisado e vai fazer alguma coisa` )
                    const message= `O ${notifications.server} está fora do ar, o O desenvolvedor ${notification.server.developer.name}já foi avisado e vai fazer alguma coisa`
                    const options ={
                        velocidade:2,
                        tipo_voz:"br-Ricardo"                        
                    }
                    client.tts.enviar(boss.telephone, message, options)
                    notifications.status==="success"
                }if (!response.dados.resposta ==="2"){
                    console.log(`O desenvolvedor ${notification.server.developer.name}já foi avisado e não pode fazer nada` )
                    const message= `O ${notifications.server} está fora do ar, o O desenvolvedor ${notification.server.developer.name}e não pode fazer nada`
                    const options ={
                        velocidade:2,
                        tipo_voz:"br-Ricardo"                        
                    }
                    notifications.status==="success"
                    client.tts.enviar(boss.telephone, message, options)
                }if (!response.dados.resposta){

                }
            })
        }

    }
},1000)
