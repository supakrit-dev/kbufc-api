import "dotenv/config";

import { createApp } from "./createApp.mjs";

const app = createApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

app.get("/", (req, res) => {
  return res.sendStatus(200);
});
