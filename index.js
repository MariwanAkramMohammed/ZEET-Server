const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const Server = http.createServer(app);

async function starts() {
  await mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
      console.log("mongoodb connected .... ");
    })
    .catch((er) => {
      console.log("connct has not created");
    });
  Server.listen(5000, () => {
    console.log("we are listening ..");
  });
}

starts();
