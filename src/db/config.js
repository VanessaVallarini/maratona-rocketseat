//este arquivo é a ponte entre o projeto e o banco de dados

//importanto o sqlite3
const sqlite3 = require('sqlite3')
//ao invés de importar tudo do sqlite importo apenas a função open - única que vamos usar
const { open } = require('sqlite')

//abrindo a conexão com o banco de dados
//o open() por regra deve estar dentro de uma função, por isso estamos utilizando ele da
//forma abaio e não simplesmente exportando o objeto open:
//module.exports = open(){}
module.exports = () => open({
    //arquivo onde as informações ficarão armazenadas
    filename: './database.sqlite',
    //driver é quem processa e armazena no arquivo os dados
    driver: sqlite3.Database
});