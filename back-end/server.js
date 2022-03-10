const express = require("express");
const app = express();
const cors = require("cors");

//middleware

app.use(cors());
app.use(express.json());

//routes

app.use("/auth", require("./renders/auth"));

app.use("/dashboard", require("./renders/dashboard"));

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
