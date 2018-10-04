import User from "../models/User";
import { SECRET, ERROR_CODES } from "../constants";
import jwt from "jsonwebtoken";
import CustomError from "../error/custom-error";

const getUser = async (id: number) => {
  const user: any = await User.findById(id);
  user.password = undefined;
  return user;
};

const editUser = async (id: number, data: any) => {
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

const deleteUser = async (id: number) => {
  if (!id) {
    throw new CustomError("Data not provided.", ERROR_CODES.DATA_NOT_PROVIDED);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new CustomError("User not found.", ERROR_CODES.DATA_NOT_SAVED);
  }

  await user.remove();
};

const createNewToken = async (user: any) => {
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

export default {
  getUser,
  editUser,
  deleteUser
};
