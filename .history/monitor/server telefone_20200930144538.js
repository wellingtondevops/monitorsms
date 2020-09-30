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
	console.log("Iniciando monitoramento dos servidores");
	for (const server of servers) {
		await axios({
			url: server.url,
			method: "get"
		}).then((response) => {
			console.log(`${server.name} está no ar!`);
		}).catch(() => {
			console.log(`${server.name} está fora do ar!`);
			const message = `Olá Guilherme avise ao desenvolvedor ${server.developer.name}, que os servidor ${server.name} está fora do ar!. Digite um se você vai fazer alguma coisa, ou dois se você não pode fazer nada!`;
			const options = {
				velocidade: 2,
				tipo_voz: "br-Vitoria",
				resposta_usuario: true
			};
			client.tts.enviar(server.developer.telephone, message, options).then((response) => {
				console.log(`O desenvolvedor ${server.developer.name} já foi avisado!`);
				console.log(response);
				notifications.push({
					id: response.dados.id,
					server,
					status: "pending"
				});
			});
		});
	}
	console.log("Finalizando monitoramento dos servidores");
},1000*60);

setInterval(function () {
	for (const notification of notifications) {
		if (notification.status === "pending") {
			client.tts.buscar(notification.id).then(function (response) {
				if (response.dados.resposta === "1") {
					console.log(`O desenvolvedor ${notification.server.developer.name} já foi avisado e vai fazer alguma coisa!`);
					const message = `O ${notification.server.name} está fora do ar, o desenvolvedor ${notification.server.developer.name} já foi avisado e vai fazer alguma coisa!`;
					const options = {
						velocidade: 2,
						tipo_voz: "br-Ricardo"
					};
					client.tts.enviar(boss.telephone, message, options);
					notification.status = "success";
				}
				if (response.dados.resposta === "2") {
					console.log(`O desenvolvedor ${notification.server.developer.name} já foi avisado e não pode fazer nada!`);
					const message = `O ${notification.server.name} está fora do ar, o desenvolvedor ${notification.server.developer.name} já foi avisado e não pode fazer nada!`;
					const options = {
						velocidade: 2,
						tipo_voz: "br-Ricardo"
					};
					client.tts.enviar(boss.telephone, message, options);
					notification.status = "success";
				}
				if (!response.dados.resposta) {
					
				}
			});
		}
	}
}, 5000);