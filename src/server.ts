import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./router";

import "./database";
import { RequestError } from "./errors/RequestError";

const app = express();
app.use(cors());

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof RequestError) {
        return res.status(err.statusCode).json({
            error: err.message
        })
    }
    console.log(err)
    return res.status(500).json({
        status: "error",
        message: err.message
    })

})

app.listen(3000, () => console.log("Server is running"));