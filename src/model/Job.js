//const { update } = require("./Profile");

//importar o config
const Database = require('../db/config')

module.exports = {
    async get() {
        //iniciando o banco de dados
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs`)

        //fechando a conexão com o banco de dados
        await db.close()

        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at
        }))
    },
    async update(updatedJob, jobId) {
        const db = await Database()
        //lembrando que esses dados vem do front, por isso temos que passar pro banco
        //nesse formato (inserindo variáveis javascript no comando sql)
        db.run(`UPDATE jobs SET
        name = "${updatedJob.name}",
        daily_hours = ${updatedJob["daily-hours"]},
        total_hours = ${updatedJob["total-hours"]}
        WHERE id = ${jobId}
        `)

        await db.close()
    },
    async delete(id) {
        //verificar no banco se tem o ID == o id recebido e deletar

        //abrindo a conexão com o banco de dados
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`)

        //fechando a conexão com o banco de dados
        await db.close()
    },
    async create(newJob) {
        //iniciando a conexão com o banco de dados
        const db = await Database()

        //inserindo no banco de dados
        await db.run(`INSERT INTO jobs (
            name, 
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )`)

        //fechando a conexão com o banco de dados
        await db.close()
    }
}