const ProjetoController = require('../controllers/projeto')

class ProjetoApi {
    async createProjeto(req, res) {
        const { nome, descricao, data} = req.body
        const id_usuario = req.cookies.userId;

        try {
            const projeto = await ProjectController.createProject(nome, descricao, data, id_usuario)
            return res.status(201).send(projeto)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar um projeto ${e.message}`})
        }
    }

    async updateProjeto(req, res) {
        const { id } = req.params
        const { nome, descricao, data} = req.body
        const id_usuario = req.cookies.userId;
        try {
            const projeto = await ProjetoController.update(Number(id), nome, descricao, data, id_usuario)
            return res.status(200).send(projeto)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar o Projeto ${e.message}`})
        }
    }

    async deleteProjeto(req, res) {
        const { id } = req.params
        const id_usuario = req.cookies.userId;

        try {
            await ProjetoController.delete(Number(id))
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar o Projeto  ${e.message}`})
        }
    }


    async findProjeto(req, res) {
        try {
            const projeto = await ProjetoController.find()
            return res.status(200).send(projeto)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar os Projetos  ${e.message}`})
        }
    }

    async exitProjeto(req, res) {
        const { id } = req.params
        const id_usuario = req.cookies.userId;

        try {
            await ProjetoController.delete(Number(id),id_usuario)
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar o Projeto  ${e.message}`})
        }
    }

}

module.exports = new ProjetoApi()