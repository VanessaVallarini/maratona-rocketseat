//esse arquivo serve para colocar algumas configurações para o banco de dados
//ele roda uma única vez
//ele é quem cria o arquivo do banco de dados
//resumindo, ele cria as tabelas

//importando o arquivo config
const Database = require('./config')


//async / await = espera o database terminar de inicializar para depois fazermos a 
//próxima coisa - isso deve ser usado aqui pq o javascript não fica olhando quando
//o database termina ou não de inicializar
//e toda vez que usarmos o await temos que usar o async, pois, este diz que tudo o que está
//dentro de um await deve ser esperado seu processamento

const initDb = {
    async init(){

        //iniciando a conexão com o banco de dados - Database()
        //observe que estamos armazenando o resultado da conexão aberta para podermos seguir 
        //para os próximos comandos
        const db = await Database()

        //observe que não estamos armazenando o resultado da execussão para podermos seguir 
        //para os próximos comandos, porque não é necessário

        //pegar o sql que será passado pra exec e executá-lo no banco de dados
        await db.exec(`CREATE TABLE profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT, 
            hours_per_day INT, 
            vacation_per_year INT, 
            value_hour INT
        )`);

        await db.exec(`CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`);

        await db.run(`
        INSERT INTO profile(
            name, 
            avatar,
            monthly_budget,
            days_per_week, 
            hours_per_day, 
            vacation_per_year,
            value_hour
        ) VALUES (
            "Ichikawa",
            "https://avatars.githubusercontent.com/u/34397262?v=4",
            3000,
            5, 
            5, 
            4,
            70
        );`)

        await db.run(`
        INSERT INTO jobs(
            name, 
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1617514376018
        );`)

        await db.run(`
        INSERT INTO jobs(
            name, 
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "OneTwo Projects",
            3,
            47,
            1617514376018
        );`)

        //fechando a conexão com o banco de dados
        await db.close()
    }
}

//executando o init()
initDb.init()