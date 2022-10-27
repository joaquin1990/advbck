import mongoose from "mongoose";
import MongoDBContainer from "./MongoDBContainer.js";
import __dirname from "../../__dirname.js";

const collection = "users";
const usersSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    admin: Boolean,
  },
  { timestamps: true }
);

export default class Users extends MongoDBContainer {
  constructor() {
    super(collection, usersSchema);
  }
}
