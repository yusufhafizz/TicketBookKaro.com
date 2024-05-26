const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const db = process.env.CONNECTION_STRING.replace(
      "<password>",
      process.env.DATABASE_PASSWORD
    );
    const connect = await mongoose.connect(db);
    console.log("Connection established with database");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;