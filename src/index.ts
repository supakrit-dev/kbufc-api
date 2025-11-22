import "dotenv/config";
import { createServer } from "./server";

const app = createServer();

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
