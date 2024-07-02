const express = require('express')
const cors = require('cors')
const database = require('../src/config/database')
const cookieParser = require('cookie-parser');

const UsuarioApi = require('../src/api/usuario')
const UsuarioRouter = require('../src/routes/usuario')

const TarefaRouter = require('../src/routes/tarefa')

const ProjetoRouter = require('../src/routes/projeto')

const app = express()
app.use(cookieParser());
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Olá Jackson' })
})


app.post('/api/v1/login', UsuarioApi.login)
app.post('/api/v1/usuario', UsuarioApi.createUsuario)


app.use(UsuarioApi.validateToken)
app.use('/api/v1/usuario', UsuarioRouter)
app.use('/api/v1/tarefa', TarefaRouter)
app.use('/api/v1/projeto', ProjetoRouter)

database.db.sync({ })
    .then(_ => {
        app.listen(8000, _ => {
            console.log('Server running on port 8000')
        })
    })
    .catch(e => {
        console.error(`Erro ao inicia o banco de dados ${e}`)
    })


    module.exports = app;