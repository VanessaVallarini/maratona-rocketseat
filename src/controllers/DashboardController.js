//esse arquivo tem a responsabilidade de pegar os dados dos demais controllers
//e model e transferi-los para view index

const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        //pegando os dados de Job model e Profile Model
        const jobs = await Job.get();
        //como estamos usando await, vamos usar aqui tb
        const profile = await Profile.get();

        //exibindo na tela a quantidade de projetos
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        //calculando o total de horas dos projetos por dia
        let jobTotalHours = 0;


        //map tem a mesma função do forEach, porém, consigo retornar um objeto novo
        //job recebe dados de Job Model através do map
        const updateJobs = jobs.map((job) => {
            //ajustes no job - calculo de tempo restante
            const remaining = JobUtils.remainingDays(job);
            //retornando o status do job, se for dia == 0 retorna done se não, em progresso
            const status = remaining <= 0 ? 'done' : 'progress';

            //somando a quantidade de status
            //se status é done 
            //statusCount[done]+=1
            //se não
            //status[progress]+=1
            statusCount[status] += 1;

            //calculando o total de horas dos projetos por dia
            jobTotalHours = status === 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"]) //valor minha hora * total de horas do projeto
            }
        })

        //total de horas que quero trabalhar por dia menos
        //horas de cada job em progresso dedicadas por dia
        const freeHours = profile['hours-per-day'] - jobTotalHours;
        

        return res.render("index", { jobs: updateJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })//esse jobs é o que vai pro index.ejs
    }
}
