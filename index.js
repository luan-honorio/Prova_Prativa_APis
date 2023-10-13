const { request, response } = require('express')
const e = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const port = 3333
//Importar o módulo conn para as operações com o banco
const mysql = require('mysql2')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Middleware para arquivos estáticos
app.use(express.static('public'))

app.get('/', (request, response) => {
  const sql = `SELECT * FROM tb_livros`

  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    }

    console.log(result)
    return response.render('home', { result })

  })

})

// CADASTRAR

app.get('/cadastrar', (request, response) => {

  return response.render('cadastrar')
})
app.post('/cadastrar', (request, response) => {
  const { titulo, categoria, descricao, valor, quantidade } = request.body
  console.log(titulo, categoria, descricao, valor, quantidade)

  const sql = `INSERT INTO tb_livros(titulo, categoria, descricao, valor, quantidade) values ('${titulo}', '${categoria}', '${descricao}', '${valor}', '${quantidade}')`

  conn.query(sql, (err) => {
    if (err) {
      console.log(err)
    }
    return response.redirect('/')
  })


})
// ///////////////////////////////////


//////////////
// Detalhes LIVRO

app.get('/Detalhes/:id', (request, response) => {
  const id = request.params.id
  const sql = `select * from tb_livros where id = ${id}`
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err)
    }
    const livros = data[0]
    return response.render('Detalhes', { livros })
    console.log(livros)


  })

})



// Atualizar
app.get('/atualizar/:id', (request, response) => {
  const id = request.params.id
  const sql = `Select * from tb_livros where id = ${id}`
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err)
    }
    const livros = data[0]
    return response.render('atualizar', { livros })
  })



})

app.post('/atualizar/:id', (request, response) => {
  const id = request.params.id
  const { titulo, categoria, descricao, valor, quantidade } = request.body
  console.log(id, titulo, categoria, descricao, valor, quantidade)

  const sql = `update tb_livros set titulo='${titulo}', categoria='${categoria}', descricao ='${descricao}', valor ='${valor}', quantidade ='${quantidade}' where id = ${id}`

  conn.query(sql, (err) => {
    if (err) {
      console.log(err)
    }
    return response.redirect('/')
  })


})










////////////////////////////////

// EXCLUIR //
app.get('/excluir/:id', (request, response) => {
  const id = request.params.id
  console.log(id)
  const sql = `delete from tb_livros where id = ${id}`
  conn.query(sql, (err) => {
    if (err) {
      console.log(err)
    }
    return response.redirect('/')
  })
})


const conn = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'aluno_medio',
  password: '@lunoSenai23.',
  database: 'prova',
})
conn.connect((err) => {
  if (err) {
    console.log(err)
  }
  console.log('Mssql con')
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
  })

})