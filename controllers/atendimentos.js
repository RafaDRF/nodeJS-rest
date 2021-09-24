const { response } = require('express')
const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (request, response) => {
        
        Atendimento.mostra(response)
    })

    app.get('/atendimentos/:id', (request, response) =>{
        const id = parseInt(request.params.id)

        Atendimento.buscaPorId(id, response)
    })
    
    app.patch('/atendimentos/:id', (request, response) =>{
        const id = parseInt(request.params.id)
        const values = request.body

        Atendimento.altera(id, values, response)
    })

    app.post('/atendimentos', (request, response) => {
        const conteudoPost = request.body

        Atendimento.adiciona(conteudoPost, response)
        
    })

    app.delete('/atendimentos/:id', (request, response) =>{
        const id = parseInt(request.params.id)

        Atendimento.deleta(id, response)
    })
}