//função require: estou chamando o pacote express da nossa pasta node_modules
const express = require('express');

//funcionalidade que retornará um objeto
const routes = express.Router()

//importando o arquivo ProfileController.js e JobController.js
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController');
const DashboardController = require('./controllers/DashboardController');

//passando pelo motor engine do express (ejs)
//Deixamos de usar sendFile e passamos a usar o render porque
//não estamos mais enviando o arquivo e sim renderizando
routes.get('/', DashboardController.index);
routes.get('/job', JobController.create)
//o req está recebendo os dados que imputei no formulário do front:
//{ name: 'Discover', 'daily-hours': '9', 'total-hours': '9' }
routes.post('/job', JobController.save)
//pegando o ID através do req
routes.get('/job/:id', JobController.show)
//passando o objeto criado acima
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
//e o motor engine substitui os dados do HTML profile.ejs por este objeto
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)
module.exports = routes;