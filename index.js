const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tables')

conexao.connect(erro => {
    if(erro){
        console.error(erro)
    }else{
        console.log('conectado com sucesso ao banco de dados')

        Tabelas.init(conexao)
        const app = customExpress()

        app.listen(3000, ()=> console.log('servidor rodando na porta 3000'))
    }
})

