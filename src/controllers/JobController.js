//importando os dados de job
const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    create(req, res) {
        return res.render("job")
    },

    async save(req, res) {
        await Job.create({ //empurrando/armazenando os dados vindos do form html para o array de jobs
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()//atribuindo hora de hoje em milissegundos
        });
        return res.redirect('/')
    },

    async show(req, res) {
        const jobId = req.params.id //recebendo o id do job através do req
        const jobs = await Job.get()

        //find é muito parecido com foreach e map
        //forEach vai percorrer todos os elementos
        //mas retorna um novo array
        //find procura algo dentro do array
        //se o id do job for igual ao id do job do req, armazena na const job
        const job = jobs.find(job => Number(job.id) === Number(jobId))
        if (!job) {
            return res.send('Job not found!')
        }
        const profile = await Profile.get()
        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])
        return res.render("job-edit", { job })
    },

    async update(req, res) {
        const jobId = req.params.id //recebendo o id do job através do req

        //criando um objeto com os parâmetros do job do id que veio na requisição
        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        Job.update(updatedJob, jobId)
        res.redirect('/job/' + jobId)
    },

    async delete(req, res) {
        const jobId = req.params.id //recebendo o id do job através do req
        await Job.delete(jobId)
        return res.redirect('/')
    }
}