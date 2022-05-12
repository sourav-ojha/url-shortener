const express = require("express");
const cors = require("cors");
const APIroutes = require("./routes");
const connectDB = require("./config/db");
const path = require("path");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.middlewares();
    this.routes();
    // static file
    this.app.use(express.static(path.join(__dirname, "./build")));
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use("/api", APIroutes);
    this.app.get("/404-not-found", (req, res) => {
      console.log(path.join(__dirname, "./404.html"));
      res.sendFile(path.join(__dirname, "./404.html"));
    });
    this.app.get("/so", (req, res) =>
      res.sendFile(path.join(__dirname, "./build/index.html"))
    );
  }
  listen() {
    connectDB()
      .then(() => {
        console.log("mogo db connected");
        this.app.listen(this.port, () => {
          console.log("server started at :", this.port);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Server;
