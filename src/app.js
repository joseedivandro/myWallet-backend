import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { Home } from "./controllers/home.controller.js";
import { transactions } from "./controllers/transactions.controller.js";
import { loginUser } from "./controllers/signIn.controller.js";
import { createUser } from "./controllers/signup.controller.js";


const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();



app.post("/cadastro", createUser)

app.post("/sign-in", loginUser)

app.get("/home", Home)

app.post("/transactions/:type", transactions)



const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))