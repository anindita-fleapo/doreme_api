import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";

export async function isAutheticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Unauthorized");
  }

  if (!authorization.startsWith(" "))
    return res.status(401).send({ message: "unauthorized" });

  const split = authorization.split(" ");
  if (split.length !== 2)
    return res.status(401).send({ message: "unauthorized" });

  const token = split[1];

  try {
    const decodeTooken: admin.auth.DecodedIdToken = await admin
      .auth()
      .verifyIdToken(token);

    console.log("decodedetoken", JSON.stringify(decodeTooken));
    res.locals = {
      ...res.locals,
      uid: decodeTooken.uid,
      role: decodeTooken,
      email: decodeTooken.email,
    };

    return next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
}
