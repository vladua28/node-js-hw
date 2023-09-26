import { config } from "dotenv";

config();

export const configs = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT || 3000,
};

export interface IConfigs {
  DB_URL: string;
  PORT: number;
}
