import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import { Router } from "./routes/config.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/v1', Router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export { app as application };