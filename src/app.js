import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import {MongoClient, ObjectId} from "mongodb"
import bcrypt, { hash } from "bcrypt"
import joi from "joi"
import {v4 as uuid} from "uuid"
import { usuarioSchema, userLoginSchema } from "./schemas/UsersSchema.js"

const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()

const mongoClient = new MongoClient(process.env.DATABASE_URL)

try{
    await mongoClient.connect()
    console.log('MongoDB conectado')
} catch(err){
    console.log(err.message)
}

const db = mongoClient.db()



//Endpoints 
app.get("/teste", (req, res)=>{
    res.send("Oi, Let")
})


//deixa o app escutando, à espera de requisições 

const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))


app.post("/sign-up", async(req,res)=>{

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
})

app.post("/sign-in", async (req,res)=>{
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
})
