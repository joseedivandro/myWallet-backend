import joi from "joi"


//schemas
export const usuarioSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().required().min(3)
})

export const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().invalid("").required().min(3)
})