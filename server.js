const express = require("express");
const cors = require("cors");
const APIroutes = require("./routes");
const connectDB = require("./config/db");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use("/api", APIroutes);
    // this.app.use("/shtly", path )
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
