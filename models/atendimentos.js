// models vai fazer a parte da conexão com o BD
const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
    // models consome o body e o res que vem do controllers
    adiciona(atendimento, res) {
        // formato de entrada e formato que vai ser tratado
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS'); 
        
        // manipulando data com a biblioteca moment
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS'); //pega a hora atual

        // validação da data e do nome (retornam booleanos)
        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteValido = atendimento.cliente.length >= 5;

        // validação para o dataValida e o clienteValido - cada um é um obj
        const validacoes = [
            { 
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Nome do cliente deve ter pelo menos 5 caracteres'
            }
        ];

        // fazendo a verificação se existe algum erro com a data/cliente
        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length; // se tiver tamanho, tem erros

        // validação final - cria o novo atendimento
        if(existemErros) {
            res.status(400).json(erros); // mostra a mensagem
        }
        else {
            
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            
            //criando a query pro mysql - o ? é o que vai ser inserido na table
            const sql = 'INSERT INTO Atendimentos SET ?';
            
            // 2 parametro pode ser varias coisas - nesse caso é o objeto que estamos salvando
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro); // bad request
                }
                else {
                    res.status(201).json(atendimento); // atendimento criado
                }
            });
        }
    }

    lista(res) {
        // fazendo a query para listar os dados da tabela
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            }
            else {
                res.status(200).json(resultados);
            }
        })
    }

    buscaPorId(id, res) {
        // criando a query para buscar o atendimento 
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
        conexao.query(sql, (erro, resultados) => {
            // devolvendo um objeto só - antes era um array de atendimentos
            //const atendimento = resultados[Number(id)-1];            
            
            if(erro) {
                res.status(400).json(erro);
            }
            else {
                res.status(200).json(resultados);
            }
        });
    }

    altera(id, valores, res) {
        // convertendo o formato de data - ler no formato certo e converter para o formato padrão 
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }

        // criando a query para alterar a tabela - vamos passar valores nos ?
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        // array para passar os parametros que ficam no ?
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            }
            else {
                res.status(200).json({...valores, id}); // mostrando dados que o cliente possa entender
            }
        });
    }

    alteraTodos(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }

        // criando a query para alterar a tabela - vamos passar valores nos ?
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        // array para passar os parametros que ficam no ?
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            }
            else {
                res.status(200).json({...valores, id}); // mostrando dados que o cliente possa entender
            }
        });        
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?';
        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);            
            }
            else {
                // res.status(200).json(resultados);
                res.status(200).json({id});
            }
        });
    }
}

// exportando para o controller poder acessar
module.exports = new Atendimento;