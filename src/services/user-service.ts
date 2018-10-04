import User from "../entities/user.entity";
import { SECRET } from "../constants";
import jwt from "jsonwebtoken";

export default class UserService {
  constructor() {}

  getUser = async (id: number) => {
    const user: any = await User.findById(id);
    user.password = undefined;
    return user;
  };

  editUser = async (id: number, data: any) => {
    let user: any = await User.findById(id);

    data.email = undefined;
    data.password = undefined;
    data.token = undefined;
    data.name = data.name.trim();

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (data[k]) {
          user[k] = data[k];
        }
      }
    }

    user.token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      SECRET,
      {
        expiresIn: "30d"
      }
    );

    user = await user.save();

    if (!user) {
      throw new CustomError("User not saved.", ERROR_CODES.DATA_NOT_SAVED);
    }

    return user;
  };

  deleteUser = async (id: number) => {
    if (!id) {
      throw new CustomError(
        "Data not provided.",
        ERROR_CODES.DATA_NOT_PROVIDED
      );
    }

    const user = await User.findById(id);

    if (!user) {
      throw new CustomError("User not found.", ERROR_CODES.DATA_NOT_SAVED);
    }

    await user.remove();
  };

  createNewToken = async (user: any) => {
    user.token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      SECRET,
      {
        expiresIn: "30d"
      }
    );

    user = await user.save();

    if (!user) {
      throw new CustomError("User not saved.", ERROR_CODES.DATA_NOT_SAVED);
    }

    return user;
  };
}
