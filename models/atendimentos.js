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
                    resposta.status(201).json(atendimento)
                }
            })
        }
    }
    mostra(resposta){
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados)=> {
            if(erro){
                resposta.status(400).json(erro)
            }
            else{
                resposta.status(200).json(resultados)
            }
        })
    }
    buscaPorId(id, resposta){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, resultados)=> {

            const atendimento = resultados[0]
            if(erro){
                resposta.status(400).json(erro)
            }
            else{
                resposta.status(200).json(atendimento)
            }
        })
    }
    altera(id, valores, resposta){
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        if(valores.data){
            
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        conexao.query(sql, [valores, id], (erro, resultados) =>{
            if(erro){
                resposta.status(400).json(erro)
            }
            else{
                resposta.status(200).json({...valores, id})
            }
        })
    }
    deleta(id, resposta){
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                resposta.status(400).json(erro)
            }
            else{
                resposta.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento