import { Router } from "express";
import { User } from "@models/user.entity";


const IndexRouter = Router();

IndexRouter.get('/', async (req, res, next) => {

  res.send("Hello 👋");
})

export default IndexRouter;