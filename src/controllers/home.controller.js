import db from "../databse/database.connection.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"


export async function Home(req,res) {
    const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")

  if (!token) return res.sendStatus(401);

  try {
    const session = await db.collection("sessions").findOne({token})
    if (!session) return res.sendStatus(401);
    const user = await db.collection("users").findOne({ email : session.email })
    if (!user) return res.sendStatus(401)
    const transactions = await db.collection("transactions").find({email: user.email}).toArray();
    res.send(transactions)

  }catch (err) {
    res.status(500).send(err.message)
  }

}