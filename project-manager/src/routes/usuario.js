const express = require('express')

const UsuarioApi = require('../api/usuario')
const usuario = require('../models/usuario')
const router = express.Router()

router.put('/:id', UsuarioApi.updateUsuario)
router.get('/', UsuarioApi.findUsers)
router.delete('/:id', UsuarioApi.deleteUsuario)
router.put('/', UsuarioApi.exitUsuario)

module.exports = router