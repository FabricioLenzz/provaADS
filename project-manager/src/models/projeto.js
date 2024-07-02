const database = require('../config/database')

class Projeto {
    constructor() {
        this.model = database.db.define('projeto', {
            id: { 
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: database.db.Sequelize.STRING,
                validate: {
                    len: {
                        args: [4, 50 ],
                        msg: "o campo nome deve ter mais de 4 e ate 50 caracteres"
                    }
                }
            },
            descricao: {
                type: database.db.Sequelize.STRING,
                validate: {
                    len: {
                        args: [4, 80 ],
                        msg: "o campo descrição deve ter mais de 4 e ate 80 caracteres"
                    }
                }
            },
            id_usuario: {
                type: database.db.Sequelize.STRING
            },
            data:{
                type: database.db.Sequelize.STRING
            }
        })
    }
}

module.exports = (new Projeto()).model