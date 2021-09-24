const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, resposta){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        
        const minimoDeCaracteres = 3
        const clienteEhValido = atendimento.cliente.length >= minimoDeCaracteres 

        const validacoes = [
            {
                nomeCampo: 'data',
                valido: dataEhValida,
                mensagemDeErro: 'A data agendada ser igual ou posterior a data atual'
            },
            {
                nomeCampo: 'cliente',
                valido: clienteEhValido,
                mensagemDeErro: `O nome do cliente deve ter pelo menos ${minimoDeCaracteres} caracteres`
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            resposta.status(400).json(erros)
        }
        else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            
            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados)=>{
                if(erro){
                    resposta.status(400).json(erro)
                }
                else{
                    resposta.status(201).json(resultados)
                }
            })
        }
    }
}

module.exports = new Atendimento