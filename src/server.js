//função require: estou chamando o pacote express da nossa pasta node_modules
const express = require("express")

//criando o meu servidor executendo o pacote do express
const server = express()

//pegando a saído do arquivo routes.js
const routes = require("./routes") 

const path = require("path")

//setando uma configuração
//express já tem uma idéia de template engine e estamos reutilizando 'view engine'
//ejs faz um processamento do html olhando tudo o que tem <% (contexto)
//todo contexto contexto será explorado com javascript e vai ser refeito em HTML puro
server.set('view engine', 'ejs')

//mudar a localização da pasta views
//server: servidor
//set: setar, configurar algo
//nossa pasta padrão é a views, mas como eu quero mudar ela vamos usar o path - caminho de arquivo
//join: junta o dirname com views
//dirname é a pasta mãe desse arquivo, ou seja, src
server.set('views', path.join(__dirname, 'views'))

//habilitar arquivos estáticos
server.use(express.static("public"))

//usar o req.body
//extended: true habilita o uso do req.body
server.use(express.urlencoded( {extended: true} ))

//utilizando a rota criada no arquivo Routes
server.use(routes)

//Funcionalidade do express para simular o nosso servidor em uma determinada porta
server.listen(3000, () => console.log('rodando'))
