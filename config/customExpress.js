const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const { application } = require('express');

//função para configurar o app
module.exports = () => {
    const app = express();
    
    //usando o bodyparser para ler no formato urlencoded (pq tá assim no postman ainda) - da pra usar json tbm
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    //incluindo todos os modulos para o app
    consign()
        .include('controllers')
        .into(app);

    return app;
}
