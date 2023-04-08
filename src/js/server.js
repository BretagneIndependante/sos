const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const api = require("./function");
const multer = require("multer");

require("dotenv").config();

const APIversion = "/API/v1";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/temp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    if (file.size > 100000000) {
      return cb(new Error("File size is too big! Max size is 100MB"));
    }
    cb(null, true);
  },
});

app.use(
  cors({
    origin: "https://127.0.0.1:3000",
    optionsSuccessStatus: 200,
  })
);

app.get(`${APIversion}/account/login`, async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  const resp = await api.login(req.query);
  res.status(resp.status).send(resp.message);
});

app.post(
  `${APIversion}/ticket/create`,
  upload.array("images"),
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-Type, Authorization"
    );
    const resp = await api.createTicket(req.body, req.files);
    res.status(resp.status).send(resp.message);
  }
);

app.get(`${APIversion}/ticket/get`, async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  const resp = await api.getTickets(req.query);
  res.header("Content-Type", "application/json");
  res.status(resp.status).send(resp.message);
});

app.post(`${APIversion}/chat/send`, async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  const resp = await api.sendChat(req.query);
  res.status(resp.status).send(resp.message);
});

app.get(`${APIversion}/chat/get`, async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  const resp = await api.getChat(req.query);
  res.header("Content-Type", "application/json");
  res.status(resp.status).send(resp.message);
});

app.get(`${APIversion}/quoi`, (req, res) => {
  res.send("QUOICOUBEH");
});

// Serve React static files
app.use(express.static(path.join(__dirname, "../../build")));

// Add this catch-all route at the end of your routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

app.listen(process.env.API_PORT);
