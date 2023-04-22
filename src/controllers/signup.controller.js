import db from "../databse/database.connection.js";
import bcrypt from "bcrypt"


export async function createUser(req,res) {

    const {nome, email, senha} = req.body
    const validation = usuarioSchema.validate(req.body, {abortEarly: false})

    if(validation.error){
        const erros = validation.error.details.map((detail)=> detail.message);
        return res.status(422).send(erros);
    }
    const hash = bcrypt.hashSync(senha,10)

    try{
        const usuario = await db.collection("usuarios").find({email})
        if(usuario) return res.status(409).send("e-mail já cadastrado")
        await db.collection("usuarios").insertOne({nome,email,senha: hash})
        res.sendStatus(201)

    }catch(err){
        res.status(500).send(err.message)
    }
}