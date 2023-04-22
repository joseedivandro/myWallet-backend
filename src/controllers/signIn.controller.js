import db from "../databse/database.connection.js";
import bcrypt from "bcrypt"


export async function loginUser (req,res){
    const { email, senha} = req.body
    try{
        const usuario = await db.collection("usuarios").findOne({email})
        if(!usuario) return res.status(401).send("E-mail não cadastrado")

        const senhaEstaCorreta = bcrypt.compareSync(senha, usuario.senha)
        if(!senhaEstaCorreta) return res.status(401).send("Senha incorreta!")

        const token = uuid()
        await db.collection("sessoes").insertOne({token, idUsuario: usuario._id })
        res.send(token)

    }catch(err){
        res.status(500).send(err.message)
    }
}