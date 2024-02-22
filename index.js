import express from "express";
const app = express();
const port = 8000;
import cors from "cors";
import fetch from "node-fetch";
import "dotenv/config";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to webhook executor" });
});

app.post("/webhook/execute", async (req, res) => {
  try {
    const payload = req.body;
    const recallUrl = process.env.recall_url;
    try {
      const response = await fetch(recallUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      throw new Error(error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log("listening the port", port);
});
