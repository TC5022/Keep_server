import mongoose from "mongoose";
import { CONNECT_DB } from "./config.js";

export function init(){
  mongoose.connect(CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => console.log("DB Connected!"));
  mongoose.connection.on("error", console.error);
  mongoose.connection.on("disconnected", () => console.log("DB Disconnected!"));
};