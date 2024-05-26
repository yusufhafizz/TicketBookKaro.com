const express = require("express");

const connectDB = require("./config/dbConnection");

const dotenv = require("dotenv").config();
const app = express();
connectDB();

const port = process.env.port || 5000;
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // You can specify specific origins instead of '*'
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bookingHistory", require("./routes/bookingRoutes"));
// app.get("/api/getUsers", (req, res) => {
//   console.log(req);
//   res.status(200).json({ message: "Sentffffffffffttttt" });
// });
app.listen(port, () => {
  console.log("Listening on port " + port);
});
