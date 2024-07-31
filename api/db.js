import mysql from 'mysql'

// Criando a conexão com o banco criado
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database:"crud"
})