import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import { SECRET, ACCESS_TOKEN_EXPIRES } from "../constants";
import { User } from "../entities/user.entity";
import { Connection } from "typeorm";

export default class AuthService {
  private dbConnection: Connection;

  constructor(dbConnection: Connection) {
    this.dbConnection = dbConnection;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      return null;
    }

    if (!this.comparePassword(password, user)) {
      return null;
    }

    return this.issueToken(user);
  }

  async signup(email: string, password: string): Promise<string> {
    let user = User.create({ email, password });
    await this.dbConnection.manager.getRepository(User).insert(user);
    return this.issueToken(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.dbConnection.manager
      .getRepository(User)
      .findOne({ email: email });
  }

  comparePassword(plainPass: string, user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(
        plainPass,
        user.password,
        (err: Error, isPasswordMatch: boolean) => {
          return err == null ? resolve(isPasswordMatch) : reject(err);
        }
      );
    });
  }

  issueToken(user: User): string {
    return jwt.sign({ id: user.id }, SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES
    });
  }
}
