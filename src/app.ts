import { config } from "dotenv";
import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/configs";
import { User } from "./models/user.model";
import { IUser } from "./types/user.type";

config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    const users = await User.find();
    return res.json({ data: users });
  },
);

app.post("/users", async (req, res) => {
  const createdUser = await User.create({ ...req.body });
  res.status(201).json({ data: createdUser });
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
});
