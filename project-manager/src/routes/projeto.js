const express = require('express')

const ProjetoApi = require('../api/projeto')
const router = express.Router()

router.put('/:id', ProjetoApi.updateProjeto)
router.post('/', ProjetoApi.createProjeto)
router.get('/', ProjetoApi.findProjeto)
router.delete('/:id', ProjetoApi.deleteProjeto)

module.exports = router