import db from "../databse/database.connection.js";
import bcrypt from "bcrypt"
import { userSchema } from "../middlewares/user.schema.js";



export async function createUser(req,res) {

    const { name, email, password} = req.body
  const validation = userSchema.validate(req.body, { abortEarly: false })
  if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
  }

  try {
      const user = await db.collection("users").findOne({ email })
      if (user) return res.status(409).send("E-mail já cadastrado")

      const hash = bcrypt.hashSync(password, 10)

      await db.collection("users").insertOne({ name, email, password: hash })
      console.log(hash)
      res.sendStatus(201)

  } catch (err) {
      res.status(500).send(err.message)
  }
}