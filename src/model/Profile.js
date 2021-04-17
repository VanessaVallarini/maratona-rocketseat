//importar o config
const Database = require('../db/config')

//criando um objeto do tipo get e exportando ele
//utilizando o update para atualizar os dados
module.exports = {
    async get() {
        //iniciando o banco de dados
        const db = await Database()
        //selecionando todos os campos da tabela profile
        //trocamos run para get. Get busca apenas 1 linha da tabela
        const data = await db.get(`SELECT * FROM profile`)
        //fechando a conexão com o banco de dados
        await db.close(data)
        //normalizando os dados
        //no Banco de Dados temos os _ mas nas views temos os -
        //para evitarmos de alterarmos em todo o projeto - para _
        //vamos normalizar aqui
        return{
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
        };
    },
    async update(newData) {
        //iniciando o banco de dados
        const db = await Database()
        //${} essa notação serve para passarmos variáveis java script dentro do comando 
        //do sqlite
        db.run(`UPDATE profile SET
            name = "${newData.name}",
            avatar = "${newData.avatar}",
            monthly_budget = ${newData["monthly-budget"]},
            days_per_week = ${newData["days-per-week"]},
            hours_per_day = ${newData["hours-per-day"]},
            vacation_per_year = ${newData["vacation-per-year"]},
            value_hour = ${newData["value-hour"]}
        `)
        //fechando a conexão com o banco de dados
        await db.close()
    }
}
