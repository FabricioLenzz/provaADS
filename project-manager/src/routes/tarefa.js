const express = require('express')

const TarefaApi = require('../api/tarefa')
const router = express.Router()

router.put('/:id', TarefaApi.updateTarefa)
router.post('/', TarefaApi.createTarefa)
router.delete('/:id', TarefaApi.deleteTarefa)
router.get('/:id_projeto', TarefaApi.filterTarefa)
router.get('/', TarefaApi.findTarefa)


module.exports = router