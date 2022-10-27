import mongoose from "mongoose";
import config from "../../config/config.js";

export default class MongoDBContainer {
  constructor(collection, schema) {
    mongoose.connect(config.mongo.MONGO_URL, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Atlas DB connected");
      }
    });
    this.model = mongoose.model(collection, schema);
  }

  getAll = async () => {
    let data = await this.model.find();
    return data;
  };

  getById = async (id) => {
    let result = await this.model.findOne({ _id: id });
    console.log(result);
    return result;
  };

  deleteById = async (id) => {
    await this.model.deleteOne({ _id: id });
  };

  update = async (object) => {
    let id = object.id ? object.id : object_id;
    await this.model.updateOne({ _id: id }, { $set: object });
  };

  editById = async (id, document) => {
    let results = await this.model.findOneAndUpdate({ _id: id }, document);

    return results;
  };

  deleteAll = async () => {
    await this.model.deleteAll();
  };
  save = async (item) => {
    let result = await this.model.create(item);
    return result;
  };
  findone = async (item) => {
    let result = (await this.model.findOne(item)) || null;
    return result;
  };
}
