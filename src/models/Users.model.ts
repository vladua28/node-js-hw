import { model, Schema } from "mongoose";

import { EGender } from "../enums/gender.enum";

const userSchema = new Schema(
  {
    name: { type: String },
    age: {
      type: Number,
      min: [0, "Age must be greater than 0"],
      max: [150, "Age must be less than 150"],
    },
    gender: {
      type: String,
      enum: EGender,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model("user", userSchema);
