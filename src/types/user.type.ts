import { Document } from "mongoose";

import { EGender } from "../enums/gender.enum";

export interface IUser extends Document {
  name?: string;
  email: string;
  age?: number;
  gender?: EGender;
  password: string;
}
