const express = require('express')
const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '',
    database: 'biblioteca'
})

const app = express()

app.use(express.json())

app.post('/autor', async function (req, res) {
    const { nome, idade } = req.query
    try {

        const query = 'insert into autores (nome, idade) values ($1, $2)'
        const params = [nome, idade]

        const resultado = await pool.query(query, params)

        return res.json(resultado.rows)

    } catch (error) {
        console.log(error.message)
    }
})

app.get('/autor/:id', async function (req, res) {
    const { id } = req.params
    try {

        const query = 'select * from autores join livros on autores.id = livros.id_autor where livros.id = $1'
        const params = [id]

        const resultado = await pool.query(query, params)

        return res.json(resultado.rows)

    } catch (error) {
        console.log(error.message)
    }
})

app.post('/autor/:id/livro', async function (req, res) {
    const { id } = req.params
    const { nome, genero, editora, data_publicacao } = req.body
    if (!nome) return res.json({ mensagem: "o campo nome é obrigatorio" })


    try {

        const query = 'insert into livros (nome, genero, editora, data_publicacao, id_autor) values ($1, $2, $3, $4, $5)'
        const params = [nome, genero, editora, data_publicacao, id]

        const resultado = await pool.query(query, params)

        return res.json(resultado)

    } catch (error) {
        console.log(error.message)
    }
})

app.get('/livro', async function (req, res) {
    try {
        const query = 'select * from livros join autores on autores.id = livros.id_autor'

        const resultado = await pool.query(query)

        return res.json(resultado.rows)

    } catch (error) {

    }

})

app.listen(3000)