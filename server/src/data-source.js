const mongoose = require("mongoose");

// const dbURL = "mongodb://127.0.0.1:27017/book-my-show";
const dbURL = process.env.MONGO_DB_URL;

class AppDataSource {
  static async connect() {
    try {
      await mongoose.connect(dbURL, {
        serverSelectionTimeoutMS: 5000, // 👈 important
      });
      console.log("Mongoose connected");
    } catch (err) {
      console.error("Mongoose connection error:", err);
      throw err;
    }
  } 

  static async disconnect() {
    await mongoose.disconnect();
  }
}

module.exports = AppDataSource;
