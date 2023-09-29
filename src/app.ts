import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/configs";
import { User } from "./models/user.model";
import { IUser } from "./types/user.type";
import { UserValidator } from "./validators/user.validator";

config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> => {
    const users = await User.find();
    return res.json(users);
  },
);

app.get(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      res.json(user);
    } catch (e) {
      next(e);
    }
  },
);
app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = UserValidator.create.validate(req.body);
    if (error) {
      throw new Error(error.message);
    }
    const createdUser = await User.create(value);
    res.status(201).json(createdUser);
  } catch (e) {
    next(e);
  }
});

app.put(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new Error(error.message);
      }

      const user = await User.findByIdAndUpdate(id, value, {
        returnDocument: "after",
      });

      if (!user) {
        throw new Error("User not found");
      }

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  },
);

app.delete(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      await User.deleteOne({ _id: id });
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.json(error.message);
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URI);
  console.log(`Server has successfully started on PORT ${configs.PORT}`);
});
