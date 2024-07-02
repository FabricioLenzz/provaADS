const tarefa = require('../models/tarefa')
const projeto = require('../models/projeto')

class TarefaController {
    async createTarefa(titulo, descricao, id_projeto) {
        if (!titulo || 
            !descricao ||
            !id_projeto ) {
            throw new Error('Título, Descrição, Status e id_projeto são obrigatórios.')
        }
        const projetoValue = await projeto.findByPk(id_projeto);
        if (!projetoValue) {
            throw new Error('Projeto não encontrado.');
        }
        const status = "pendente";
        const tarefaValue = await tarefa.create({
            titulo,
            descricao,
            status,
            data_conclusao: null,
            id_projeto
        })

        return tarefaValue
    }

    async findTarefa(id) {
        if (!id ) {
            throw new Error('Id é obrigatório.')
        }

        const tarefaValue = await tarefa.findByPk(id)
        
        if (!tarefaValue) {
            throw new Error('Tarefa não encontrado.')
        }

        return tarefaValue
    }
    

    async update(id, titulo, descricao, status, id_projeto) {
        if (!id || 
            !titulo || 
            !descricao  || 
            !status  || 
            !id_projeto ) {
            throw new Error('Id, título, Descrição, Status e id_projeto são obrigatórios.')
        }

        const tarefaValue = await this.findTarefa(id)
        const data_conclusao = null

        tarefaValue.titulo = titulo
        tarefaValue.descricao = descricao
        tarefaValue.status = status
        tarefaValue.id_projeto = id_projeto
        tarefaValue.data_conclusao = data_conclusao
        tarefaValue.save()

        return tarefaValue
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id é obrigatório.')
        }
        const tarefaValue = await this.findTarefa(id)
        tarefaValue.destroy()

        return
    }

    async find() {
    
        return tarefa.findAll()

    }

    async filter(id_projeto,status){
        if (isNaN(id_projeto)) {
            throw new Error('O ID do projeto deve ser um número.');
        }
        
        if(status){
            return await tarefa.findAll({
                where: {
                id_projeto: id_projeto,
                status: status
                }
            });
        } else {
            return await tarefa.findAll({
                where: {
                    id_projeto: id_projeto
                }
            });
        }
    }

} 

module.exports = new TarefaController()