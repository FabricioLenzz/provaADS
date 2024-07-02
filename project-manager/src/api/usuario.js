const UsuarioController = require('../controllers/usuario')




class UsuarioApi {

    async createUsuario(req, res) {
        const { nome, email, senha, datanasc } = req.body

        try {
            if (!nome) {
                throw new Error('Nome, é obrigatorio.')
                }else if (!email) {
                throw new Error('Email, é obrigatorio.')
                } else if (!senha) {
                throw new Error('Senha, é obrigatorio.')
                } else if (!datanasc) {
                throw new Error('Datanasc é obrigatorio.')
                }
            const usuario = await UsuarioController.createUsuario(nome, email, senha, datanasc)
            return res.status(201).send(usuario)
        } catch (e) {
            console.log(e)
            return res.status(400).send({ error: `Erro ao criar usuário ${e.message}`})
        }
    }


    async updateUsuario(req, res) {
        const { nome, email, senha, datanasc } = req.body
        const userLogado= req.cookies.usuario_id;

        try {
            const usuario = await UsuarioController.update(Number(userLogado), nome, email, senha, datanasc)
            return res.status(200).send(usuario)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar usuário ${e.message}`})
        }
    }


    async deleteUsuario(req, res) {
        const { userLogado } = req.params

        try {
            await UsuarioController.delete(Number(userLogado))
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar usuário ${e.message}`})
        }
    }

    
    async exitUsuario(req, res) {
        try {
            return res.status(204).send();
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar usuário ${e.message}`})
        }
    }

    async findUsers(req, res) {
        const userLogado = req.cookies.usuario_id;
        try {
            const usuario = await UsuarioController.find(userLogado)
            return res.status(200).send(usuario)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar usuário ${e.message}`})
        }
    }

    async login(req, res) {
        const { email, senha } = req.body

        try {
            const token = await UsuarioController.login(email, senha,0)
            const usuario_id = await UsuarioController.login(email, senha,1)
            
            res.cookie('usuarioId', usuario_id, { httpOnly: true, secure: true });
            res.cookie('token', token, { httpOnly: true, secure: true });
            res.status(200).send(usuario .token )
        } catch (e) {
            res.status(400).send({ error: e.message })
        }
    }

    async validateToken(req, res, next) {
        const token = req.cookies.token;

        try {
            await UsuarioController.validateToken(token)
            next()
        } catch (e) {
            res.status(400).send({ error: e.message })
        }
    }
}

module.exports = new UsuarioApi()