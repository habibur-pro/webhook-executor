const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to webhook executor" });
});

app.post("/webhook/execute", async (req, res) => {
  try {
    const payload = req.body;
    console.log({ pay });
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
      res.status(200).json({ success: true });
    } catch (error) {
      throw new Error(error);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log("listening the port", port);
});
