const database = require('../config/database');
const projeto = require('./projeto');

class Tarefa {
    constructor() {
        this.model = database.db.define('tarefa', {
            id: { 
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: database.db.Sequelize.STRING,
                validate: {
                    len: {
                        args: [1, 100],
                        msg: "O campo Titulo deve ter entre 1 e 100 caracteres"
                    }
                }
            },
            descricao: {
                type: database.db.Sequelize.STRING,
                validate: {
                    len: {
                        args: [1, 100],
                        msg: "O campo descrição deve ter entre 1 e 100 caracteres"
                    }
                }
            },
            id_projeto: {
                type: database.db.Sequelize.INTEGER, 
                allowNull: false,
                references: {
                    model: 'projetos',
                    key: 'id'
                }
            },
            status: { 
                type: database.db.Sequelize.STRING,
                validate: {
                    isIn: {
                        args: [['pendente', 'em andamento', 'concluída']],
                        msg: 'O status deve ser pendente, em andamento ou concluída'
                    }
                }
            },

            data_conclusao:{
                type: database.db.Sequelize.DATE,
                allowNull: true
            }
        
        },{
            hooks: {
                beforeCreate: async (tarefa, options) => {
                    const Projeto = await database.db.models.projeto.findOne({
                        where: { id: tarefa.id_projeto }
                    });
                    
                    if (!projeto) {
                        throw new Error('Projeto não encontrado');
                    }

                    if (!projeto) {
                        throw new Error('Tarefas só podem ser criadas quando estiver um projeto ativo');
                    }
                },
                    beforeSave: (tarefa, options) => {
                        if (tarefa.status === 'concluida'){
                            tarefa.data_conclusao = new Date();
                        }
                    }
                }
            })
    }
}

module.exports = (new Tarefa()).model