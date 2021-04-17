//importanto o arquivo Profile da pasta model
const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        //.get == pegar os dados do Profile
        return res.render("profile", { profile: await Profile.get() })
    },

    //faz o calculo do custo de hora
    async update(req, res) {
        //req.bory para pegar os dados inputados pelo usuário
        const data = req.body
        //definir quantas semanas tem em um ano: 52
        const weeksPerYear = 52
        //remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
        //quantas horas por semana estou trabalhando
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        //total de horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth
        //qual será o valor da minha hora?
        const valueHour = data["monthly-budget"] / monthlyTotalHours
        //criamos essa variável apenas para deixar o código mais limpo
        const profile = await Profile.get()
        //criando um novo objetivo profile com o update
        await Profile.update({
            //pegando os dados do model Profile
            ...profile,
            //substituindo os dados do model Profile pelso dados vindos da requisição
            ...req.body,
            //adicionando o valor hora no model Profile
            "value-hour": valueHour
        })

        return res.redirect('/profile')
    }
}