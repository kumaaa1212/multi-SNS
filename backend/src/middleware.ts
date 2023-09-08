import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config()

// 新しい型定義を作成して、Request インターフェースを拡張
declare global {
  namespace Express {
    interface Request {
      userId?: number; // userId プロパティを追加
    }
  }
}

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Token missing in authorization header" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(401).json({ error: "Authentication failed" });
      }
      req.userId = decoded.id;
      next();
    }
  );
};