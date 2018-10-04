import { Request, Response } from "express";

export default (message: string) => {
  return (_: Request, res: Response) => res.status(404).json(message);
};
