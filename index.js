const express = require("express");
const authRoute = require("./routers/auth");
const itemsRoute = require("./routers/items");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

// connect database
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("mongoose is connected !")
);

// app middlewares
app.use(express.json());

//route middlewares
app.use("/api/user", authRoute);
app.use("/api", itemsRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server start at port 3000");
});
