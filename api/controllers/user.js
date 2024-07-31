// Importando a função db que foi criado no arquivo db.js
import { db } from '../db.js'

// Método para BUSCAR os dados de usuario do banco
// É necessário ser como export pois vamos executar essa função em outro componente;
export const getUsers = (_, res) => {
    // q = querry
    const q = "SELECT * FROM usuarios";

    db.query(q, (err, data) => {
        if (err)
            // Caso exista algum erro na requisição ele devolverá um JSON com o erro
            return res.json(err);

        // Caso nao tenha erro devolverá status 200, indicando que está OK, e uma listagem de todos os usuarios em formato de JSON
        return res.status(200).json(data);
    });
};

// Método para ADICIONAR novos usuários

export const addUser = (req, res) => {
    const q =
        "INSERT INTO usuarios ( `nome`,  `email`,  `fone`,  `data_nascimento`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento,
    ];

    db.query(q, [values], (err) => {
        // Caso essa consulta der erro ele devolverá um json apresentando qual o erro
        if (err)
            return res.json(err);

        // Caso não exista erros vai ser apresentando o status 200 em formato json com a mensagem 'Usuáro criado com sucesso.'
        return res.status(200).json("Usuário criado com sucesso.")
    })
}

// Método para ATUALIZAR usuários

export const updateUser = (req, res) => {
    const q =
        "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err)
            return res.json(err);

        return res.status(200).json("Usuário atualizado com sucesso.")
    })
}

// Método para DELETAR usuários

export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuarios WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err)
            return res.json(err);

        return res.status(200).json("Usuário deletado com sucesso.")
    })
}




