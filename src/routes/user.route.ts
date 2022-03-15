import { Router } from "express";
import { getAllUsers } from "services/user.service";

const UserRouter = Router();

UserRouter.get('/', getAllUsers)

export default UserRouter;