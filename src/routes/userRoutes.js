import { Router } from "express";


import { createUser } from "../controllers/signup.controller.js";
import { loginUser } from "../controllers/signIn.controller.js";

import { usuarioSchema, userLoginSchema } from "../schemas/UsersSchema.js";
import { validate } from "uuid";
import { validateSchema } from "../middlewares/validataSchema.middleware.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(usuarioSchema),createUser )

userRouter.post("/sign-in", validateSchema(userLoginSchema), loginUser)

export default userRouter