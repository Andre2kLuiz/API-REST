
import mysql from 'mysql'

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'bd_copa'
})

function conectar() {
    conexao.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            // Se ocorrer um erro, você pode tentar reconectar ou realizar outras ações
            // Exemplo simples: reconectar
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                conectar();  // Chama a função conectar() novamente em caso de reconexão
            } else {
                throw err;
            }
        } else {
            console.log('Conexão bem-sucedida ao banco de dados');
        }
    });
}

// Manipulando eventos de erro
conexao.on('error', (err) => {
    console.error('Erro na conexão do banco de dados:', err);
    // Se ocorrer um erro, você pode tentar reconectar ou realizar outras ações
    // Exemplo simples: reconectar
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        conectar();  // Chama a função conectar() novamente em caso de reconexão
    } else {
        throw err;
    }
});

// Manipulando evento de desconexão
conexao.on('end', () => {
    console.log('Conexão com o banco de dados encerrada');
});

// Inicia a conexão
conectar();

/**
 * Executa um codigo sql com ou sem valores
 * @param {String} sql instrução a ser executada
 * @param {String=id / [selecao, id]} valores a serem passados para o sql
 * @param {String} menssagemReject mensagem a ser exibida
 * @returns objeto da promise
 */
export const consulta = (sql, valores = '', menssagemReject) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, valores, (erro, resultado) => {
            if(erro) return reject(menssagemReject)
            const row = JSON.parse(JSON.stringify(resultado))
            return resolve(row)
        })
    })
}

export default conexao