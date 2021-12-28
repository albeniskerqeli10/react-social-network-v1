import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/User";



const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token:string = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded:any = jwt.verify(
        token,
       process.env.ACCESS_TOKEN as Secret );

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      (error);
res.status(401).json({message:"Token failed ,you are not authorized"});
    }
  }

  if (!token) {
    res.status(401).json({message:"Token failed, no token provided"});

  }
};


export { authGuard };

