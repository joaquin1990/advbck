import fs from "fs";
import __dirname from "../../utils.js";

// const path = __dirname + "/files/items.json";
export default class FSContainer {
  constructor() {}
  getAll = async () => {
    try {
      if (fs.existsSync(this.path)) {
        let fileData = await fs.promises.readFile(this.path, "utf8");
        let items = JSON.parse(fileData);
        return items;
      } else {
        return [];
      }
    } catch (error) {
      console.log("Cannot read File : " + error);
    }
  };

  getById = async (id) => {
    try {
      let items = await this.getAll();
      let theItem = null;

      for (const item of items) {
        if (item.id == id) {
          theItem = item;
        }
      }
      return theItem;
    } catch (error) {
      console.log("Cannot read file. Error: ", error);
    }
  };

  deleteById = async (number) => {
    try {
      let items = await this.getAll();
      let findItem = items.find((item) => item.id == number);
      let newItems = items.filter((item) => item.id != number);
      if (findItem) {
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(newItems, null, "\t")
        );
      } else {
        console.log(`El id "${number}" no existe!`);
      }
    } catch (error) {
      console.log("Cannot delete item: " + error);
    }
  };

  update = async (object) => {
    try {
      let items = await this.getAll();
      let index = items.findIndex((item) => item.id == object.id);
      items[index] = object;
      await fs.promises.writeFile(this.path, JSON.stringify(items, null, "\t"));
      return true;
    } catch (error) {
      console.log("Cannot update file. Error: ", error);
    }
  };

  deleteAll = async () => {
    try {
      let items = [];
      await fs.promises.writeFile(this.path, JSON.stringify(items, null, "\t"));
    } catch (error) {
      console.log("Cannot delete all objects in file. Error: ", error);
    }
  };

  save = async (object) => {
    try {
      let items = await this.getAll();
      if (items.length === 0) {
        object.id = 1;
        items.push(object);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(items, null, "\t")
        );
        return object.id;
      } else {
        object.id = items[items.length - 1].id + 1;
        items.push(object);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(items, null, "\t")
        );
        return object.id;
      }
    } catch (error) {
      console.log("Cannot write file. Error: ", error);
    }
  };

  findOne = async (object) => {
    try {
      let items = await this.getAll();
      let result =
        items.find((item) => Object.toJSON(item) == Object.toJSON(object)) ||
        null;
      return result;
    } catch (error) {
      console.log("Cannot find object. Error: ", error);
    }
  };
}
