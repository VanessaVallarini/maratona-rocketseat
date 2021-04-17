module.exports = {
    remainingDays(job) {
        //dias que faltam
        //toFixed retorna o valor inteiro
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        //data atual e retirar os dias que já passaram
        const createdDate = new Date(job.created_at)
        //dia de criação + 20 dias pra frente, quero saber a data final do projeto
        //dueDay é o dia do vencimento do projeto
        const dueDay = Number(createdDate.getDate()) + Number(remainingDays)//toFixed tras o número em string, aqui estamos retornando para int
        const dueDateInMs = createdDate.setDate(dueDay)//criando uma nova data a partir da data atual
        //tirar da data do futuro os dias que faltam baseado na data de hoje
        const timeDiffInMs = dueDateInMs - Date.now()
        //transformar milissegundos em dias
        const dayInMs = 1000 * 60 * 60 * 24
        //arredondando para baixo a diferença de dias
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
        //restam x dias
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"] //valor minha hora * total de horas do projeto
}