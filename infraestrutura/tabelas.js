class Tabelas {
    init(conexao) {        
        //console.log('Tabelas foram criadas!')
        this.conexao = conexao; //passa a conexao para o escopo local

        this.criarAtendimentos();
    }

    criarAtendimentos() {
        //query (comandos) sql normal para criar a tabela
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos(id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))';

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro);
            }
            else {
                console.log('Tabela Atendimentos criada com sucesso');
            }
        });
    }
}

// exportando para que outros modulos possam acessar essa classe
module.exports = new Tabelas;