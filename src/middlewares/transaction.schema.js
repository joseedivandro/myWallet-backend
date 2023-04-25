import joi from "joi"

export const transactionSchema = joi.object({
    description: joi.string().required(),
    value: joi.number().positive().precision(2).strict().required()
  })