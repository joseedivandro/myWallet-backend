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



const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))