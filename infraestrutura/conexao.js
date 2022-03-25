const mysql = require('mysql2');

//recebe um objeto com as configurações da conexão
const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'agenda-petshop'
});

//exportar a conexão para outros modulos poderem acessar
module.exports = conexao;