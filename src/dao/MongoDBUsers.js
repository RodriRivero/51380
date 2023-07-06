import MongoClass from "./MongoClass.js";
import { usersSchema } from "./UsersSchema.js";

export class MongoDBUsers extends MongoClass {
  constructor() {
    super("users", usersSchema);
  }

  async getUserByUsername(username) {
    try {
      const user = await this.baseModel.findOne(username);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}
export default MongoDBUsers;