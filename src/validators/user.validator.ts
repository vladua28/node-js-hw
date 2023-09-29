import joi from "joi";

import { regexConstant } from "../constants/regex.constant";
import { EGender } from "../enums/gender.enum";

export class UserValidator {
  static firstName = joi.string().min(2).max(16).trim();
  static age = joi.number().min(18).max(150);
  static email = joi.string().regex(regexConstant.EMAIL).trim();
  static gender = joi.valid(...Object.values(EGender));
  static password = joi.string().regex(regexConstant.PASSWORD).trim();

  static create = joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    email: this.email.required(),
    gender: this.gender.required(),
    password: this.password.required(),
  });

  static update = joi.object({
    name: this.firstName,
    age: this.age,
    gender: this.gender,
  });
}
