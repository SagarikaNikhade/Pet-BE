const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db");
// user
const { Userrouter } = require("./routes/user.routes");
// auth
const { auth } = require("./middleware/auth.middleware");
// dog
const { dogRouter } = require("./routes/dog.routes");
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("please login!!");
});

// user
app.use("/users", Userrouter);

app.use(auth);

// dog
app.use("/dog", dogRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Server is running at port ${process.env.port}`);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error.message);
  }
});
