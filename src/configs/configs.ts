import { config } from "dotenv";

config();

export const configs = {
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT || 3000,
};

export interface IConfigs {
  DB_URI: string;
  PORT: number;
}
