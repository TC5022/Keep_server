import express from 'express';
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import routes from './src/routes/index.js';
import * as db from "./src/config/mongoose.js";
import { auth } from "./src/middleware/auth.js";

dotenv.config();
const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(auth);
db.init();

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Server running on port: ${port}`);
});