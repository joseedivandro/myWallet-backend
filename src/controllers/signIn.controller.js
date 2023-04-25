import db from "../databse/database.connection.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"


export async function loginUser (req,res){
    const { email, password } = req.body

  try {
      const user = await db.collection("users").findOne({ email })
      if (!user) return res.status(404).send("E-mail não cadastrado.")

      const passwordIsCorrect = bcrypt.compareSync(password, user.password)
      if (!passwordIsCorrect) return res.status(401).send("Senha incorreta")

      const token = uuid();
      await db.collection("sessions").insertOne({ token, email : user.email, name: user.name, idUser : user._id })
      return res.status(200).send({token, idUser: user._id, name: user.name})

  } catch (err) {
      res.status(500).send(err.message)
  }
}