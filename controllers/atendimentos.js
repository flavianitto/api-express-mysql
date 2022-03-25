// controller é quem vai decidir o que vai ser feito com os metodos do model
const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res);
    });

    // dando GET em um atendimento pelo ID - coloco na URL no postman
    app.get('/atendimentos/:id', (req, res) => {
        // fazer a conversão pq ele retorna como string 
        const id = Number(req.params.id);

        // chama o metodo de buscar por id do models
        Atendimento.buscaPorId(id, res);
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body; //conteudo do body é um atendimento

        Atendimento.adiciona(atendimento, res);
        // res.send('POST: Atendimento realizado!');
    });

    // alterando com o patch
    app.patch('/atendimentos/:id', (req, res) => {
        const id = Number(req.params.id);
        const valores = req.body;
        
        Atendimento.altera(id, valores, res);    
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = Number(req.params.id);        

        Atendimento.deleta(id, res);
    });

    app.put('/atendimentos/:id', (req, res) => {
        const id = Number(req.params.id);
        const valores = req.body;

        Atendimento.alteraTodos(id, valores, res);
    });
}