import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { AppDataSource } from "./config/db";
import specs from "./swagger-config";
import notesRouter from "./routes/notes";

dotenv.config({ path: "./.env" });
const app: Express = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", notesRouter);

const start = async () => {
  await AppDataSource.initialize();
  app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
};

start();
