import { User } from "../entities/user.entity";
import { Connection } from "typeorm";

export default class UserService {
  private dbConnection: Connection;

  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection;
  }

  async getUsers(): Promise<Array<User>> {
    return await this.dbConnection.manager.getRepository(User).find();
  }

  async getUser(id: string): Promise<User> {
    return await this.dbConnection.manager.getRepository(User).findOne(id);
  }

  async createUser(email: string, password: string): Promise<User> {
    const user = User.create({ email, password });
    await this.dbConnection.manager.getRepository(User).insert(user);
    return user;
  }

  async updateUser(userId: string, userData: User): Promise<User> {
    await this.dbConnection.manager
      .getRepository(User)
      .update({ id: userId }, userData);

    return await this.dbConnection.manager
      .getRepository(User)
      .findOne(userData);
  }

  async deleteUser(id: number): Promise<any> {
    const user = await this.dbConnection.manager
      .getRepository(User)
      .findOne(id);
    await this.dbConnection.manager.getRepository(User).delete(id);
    return user
      ? {
          message: "deleted"
        }
      : {
          message: "no user found"
        };
  }
}
