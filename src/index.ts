import express from "express";
import llcRoutes from "./routes/llc";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

const PORT = 3000;

app.get("/ping", (_, res) => {
  console.log("someone pinged heare!   some");
  res.send("pong");
});

app.use("/api/llc", llcRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
