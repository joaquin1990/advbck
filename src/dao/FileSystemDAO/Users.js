import FSContainer from "./FSContainer.js";
import __dirname from "../../utils.js";

export default class Users extends FSContainer {
  constructor() {
    super();
    this.path = __dirname + "/files/users.json";
  }
}
