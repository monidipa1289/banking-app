// import express from "express";
import cors from "cors";  
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js"
const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

import bankRouter from "./routes/banking.routes.js"

app.use("/api/v1", bankRouter);


app.use(errorHandler);

export { app }