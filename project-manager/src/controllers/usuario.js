const usuarioModel = require('../models/usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const SECRET_KEY = 'provafinal'
const SALT_VALUE = 10

class UsuarioController {
    async createUsuario(nome, email, senha, datanasc) {
        if (!nome || !email || !senha || !datanasc) {
            throw new Error('Nome, email ,senha  e datanasc são obrigatórios.')
        }

        const cypherSenha = await bcrypt.hash(senha, SALT_VALUE)
       
        const usuarioValue = await usuarioModel.create({
            nome,
            email,
            senha: cypherSenha,
            datanasc
        })

        return usuarioValue
    }

    async findUsuario(id) {
        if (!id) {
            throw new Error('Id é obrigatório.')
        }

        const usuarioValue = await usuario.findByPk(id)
        
        if (!usuarioValue) {
            throw new Error('Usuário não encontrado.')
        }

        return usuarioValue
    }

    async update(id, nome, email, senha, datanasc) {
        if (!id || !nome || !email || !senha || !datanasc) {
            throw new Error('Id, Nome, email , senha e datanasc são obrigatórios.')
        }

        const userValue = await this.findUser(id)

        usuarioValue.nome = nome
        usuarioValue.email = email
        usuarioValue.senha = await bcrypt.hash(senha, SALT_VALUE)
        usuarioValue.datanasc = datanasc
        usuarioValue.save()

        return usuarioValue
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id é obrigatório.')
        }
        const usuarioValue = await this.findUsuario(id)
        usuarioValue.destroy()

        return
    }

    async find() {
        return usuario.findAll()
    }

    async login(email, senha,test) {

        if(test==1){
            if (!email || !senha ) {
                throw new Error('Email e senha são obrigatórios.')
            }
    
            const usuarioValue = await usuario.findOne({ where: { email }})
    
            if (!usuarioValue) {
                throw new Error('(1) Usuário e senha inválidos.')
            }
    
            const senhaValida = bcrypt.compare(senha, usuarioValue.senha) 
            if (!senhaValida) {
                throw new Error('(2) Usuário e senha inválidos.')
            }
            return usuarioValue.id
        }
        if (!email || !senha ) {
            throw new Error('Email e senha são obrigatórios.')
        }

        const usuarioValue = await usuario.findOne({ where: { email }})

        if (!usuarioValue) {
            throw new Error('(1) Usuário e senha inválidos.')
        }

        const senhaValida = bcrypt.compare(senha, usuarioValue.senha) 
        if (!senhaValida) {
            throw new Error('(2) Usuário e senha inválidos.')
        }
        
        return jwt.sign({ id: usuarioValue.id }, SECRET_KEY, { expiresIn: 60 * 60 })
    }

    async validateToken(token) {
        if (!token) {
            throw new Error('Token inválido')
        }

        try {
            await jwt.verify(token, SECRET_KEY)
        } catch {
            throw new Error('Token inválido')
        }
    }
} 

module.exports = new UsuarioController()