import { Router } from "express";
import { getllcsFromState } from "../service/llc";

const llcRoutes = Router();

llcRoutes.post("/", (req, res) => {
  if (req.body["query"] && req.body["state"]) {
    getllcsFromState(req.body).then((info) => {
      res.json(info);
    });
  } else {
    res.status(500).json({
      message: "query or state undefined",
    });
  }
});

llcRoutes.post("/", (_req, res) => {
  res.send("post");
});

export default llcRoutes;
