import mysql from 'mysql2/promise'
import { NextApiRequest, NextApiResponse } from 'next'

type SheetForm = {
    name: string
    type: string
    value: number
    user: string
    deadline: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
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

        const query = `INSERT INTO expenses (name, type, value, user, deadline) 
                                VALUES('${test.name}','${test.type}','${test.value}','${test.user}','${test.deadline}')`
        const values = []
        const [data] = await dbconnection.execute(query, values)
        dbconnection.end()

        res.status(200).json({ data })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}