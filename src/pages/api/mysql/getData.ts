import mysql from 'mysql2/promise'

export default async function handler(req, res) {
    const dbconnection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        port: +process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        socketPath: "/var/run/mysqld/mysqld.sock"

    })

    try {


        const body = req.body
        const test = JSON.parse(body)
        console.log('O USUÁRIO É ' + test.user)
        const query = `SELECT name, type, value, user, deadline, id FROM expenses WHERE user = '${test.user}'`
        const values = []
        const [data] = await dbconnection.execute(query, values)
        dbconnection.end()

        res.status(200).json({ data })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}