const mysql = require('mysql2')

//Configuração e conexão com banco
const conn = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: '3306', 
  user: '@aluno_medio',
  password: '@lunoSenai23.',
  database: 'prova',
})

exports.conn
// É necessário exporta esse modulo