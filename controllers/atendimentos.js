const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Você está na rota Atendimentos e realizou um GET'))

    app.post('/atendimentos', (req, res) => {
        const conteudoPost = req.body

        Atendimento.adiciona(conteudoPost, res)
        
    })
}