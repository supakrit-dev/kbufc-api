import "dotenv/config";
import { Request, Response } from 'express';
import { createServer } from "./server";

const app = createServer();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

app.get('/health', (req: Request, res: Response) => {
  res.sendStatus(200);
})