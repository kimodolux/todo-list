import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import routes from './routes';

// configures dotenv to work in your application
dotenv.config();
const app = express();

app.use(express.json());

const corsOrigin ={
  origin: "*",
  credentials:true,            
  optionSuccessStatus:200
}
app.use(cors(corsOrigin))
app.use('/api', routes);

const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // throw new Error(error.message);
  console.log(error.message)
});