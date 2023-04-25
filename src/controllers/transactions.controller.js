import db from "../databse/database.connection.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"
import { transactionSchema } from "../middlewares/transaction.schema.js";
import dayjs from "dayjs";


export async function transactions(req,res) {
    const {description, value} = req.body;
    const {type} = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "")
  
    if (!token) return res.sendStatus(401);
  
    const validation = transactionSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
      const errors = validation.error.details.map(detail => detail.message);
      return res.status(422).send(errors)
    };
  
    try {

      const session = await db.collection("sessions").findOne({token})
      if (!session) return res.sendStatus(401);

      await db.collection("transactions").insertOne({...req.body, type, date: dayjs().format("DD/MM") , email : session.email})
      res.sendStatus(201)
      
    }catch (err) {
      res.status(500).send(err.message)
    }

}