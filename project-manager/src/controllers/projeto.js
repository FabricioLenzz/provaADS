const projetoModel = require('../models/projeto')

class ProjetoController {
    async createProjeto(nome, descricao, data, id_usuario) {
        if (!nome || !descricao || !data || !id_usuario ) {
            throw new Error('Nome, descrição, data e id_usuario são obrigatórios.'+ nome + descricao + data +"  :  "+ id_usuario)
        }
        const projetoValue = await projetoModel.create({
            nome,
            descricao,
            data,
            id_usuario
        })

        return projetoValue
    }

    async findProjeto(id) {
        if (!id) {
            throw new Error('Id é obrigatório.')
        }

        const projetoValue = await projeto.findByPk(id)
        
        if (!projetoValue) {
            throw new Error('Projeto não encontrado.')
        }

        return projetoValue
    }

    async update(id, nome, descricao, data, id_usuario) {
        if (!id || 
            !nome || 
            !descricao || 
            !id_usuario ) {
            throw new Error('Id, Nome, descrição, data e id_usuario são obrigatórios.')
        }

        const projetoValue = await this.findProjeto(id)
        if(projetoValue.id_usuario == id_usuario){ 
            projetoValue.nome = nome
            projeotValue.descricao = descricao
            projetoValue.data = data
            projetoValue.save()
            
        return projetoValue
        }else{
            throw new Error('Usuario invalido.')
        }
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id é obrigatório.')
        }
        const projetoValue = await this.findProjeto(id)
        projetoValue.destroy()

        return
    }

    async find() {
        return projeto.findAll()
    }

    async find(id_usuario) {
        const projetoValue = await projeto.findAll({
            where: {
                id_usuario: id_usuario
            }
        });
        return projetoValue;
    } 
} 


module.exports = new ProjetoController()