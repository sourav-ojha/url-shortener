const express = require("express");
const cors = require("cors");
const APIroutes = require("./routes");
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
    this.app.listen(this.port, () => {
      console.log("server started at :", this.port);
    });
  }
}

module.exports = Server;
