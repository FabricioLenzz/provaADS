const database = require('../config/database')
const usuario = require('../controllers/usuario')

class Usuario {
    constructor() {
        this.model = database.db.define('usuario', {
            id: { 
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: database.db.Sequelize.STRING
            },
            email: {
                type: database.db.Sequelize.STRING
            },
            senha: {
                type: database.db.Sequelize.STRING
            },
            datanasc: {
                type: database.db.Sequelize.STRING
            }
        })
    }
}

module.exports =  (new Usuario()).model;