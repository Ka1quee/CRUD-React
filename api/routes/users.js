import express from "express";
// importando as funções que se encontram no caminho abaixo
import { getUsers, addUser, updateUser, deleteUser } from "../controllers/user.js"

// Indicando que isso será uma rota
const router = express.Router()

// Atribuindo método GET e indicando que essa requisição do tipo GET será na raiz dessa rota, e após isso é chamado a função 'getUsers'
// A função 'getUsers' ja existe dentro do arquivo 'user' na pasta controllers
router.get("/", getUsers)

router.post("/", addUser)

// É necessario receber o ID do objeto para realizar o update
router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

export default router