module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Você está na rota Atendimentos e realizou um GET'))

    app.post('/atendimentos', (req, res) => {
        console.log(req.body)
        res.send('Você está na rota Atendimentos e realizou um POST')
    })
}