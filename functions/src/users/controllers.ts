import { Request, Response } from "express";
import * as admin from "firebase-admin";
/* import db from "../util/db"; */

export async function create(req: Request, res: Response) {
  try {
    const { displayName, email, password } = req.body;
    console.log(req.body);
    /*  db.collection('users').doc().set({
      name:
    }) */

    if (!displayName || !email || !password) {
      return res.status(400).json({ message: "missing the field" });
    }

    const { uid } = await admin
      .auth()
      .createUser({ displayName, email, password });
    await admin.auth().setCustomUserClaims(uid, { role: "admin" });
    const user = await admin.auth().getUser(uid);
    const token = await admin.auth().createCustomToken(uid);

    return res.status(201).json({ uid, user, token });
  } catch (error) {
    return handleError(res, error);
  }
}

export async function getAllUser(req: Request, res: Response) {
  try {
    const listUsers = await admin.auth().listUsers();
    const users = listUsers.users.map(mapUser);

    return res.status(200).send({ users });
  } catch (error) {
    return handleError(res, error);
  }
}

function mapUser(user: admin.auth.UserRecord) {
  const role = user.customClaims?.role ?? "";
  return {
    uid: user.uid,
    email: user.email || " ",
    displayName: user.displayName || " ",
    role,
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime,
  };
}

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await admin.auth().getUser(id);
    return res.status(200).json(mapUser(user));
  } catch (error) {
    return handleError(res, error);
  }
}

export async function patch(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { displayName, password, email, role } = req.body;
    if (!id || !displayName || !password || !email || !role) {
      return res.status(400).json("missing filed");
    }

    await admin.auth().updateUser(id, { displayName, password, email });
    await admin.auth().setCustomUserClaims(id, { role });
    const user = await admin.auth().getUser(id);

    return res.status(204).send({ user: mapUser(user) });
  } catch (error) {
    return handleError(res, error);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await admin.auth().deleteUser(id);
    return res.status(204).json();
  } catch (error) {
    return handleError(res, error);
  }
}

function handleError(res: Response, error: any) {
  return res.status(500).send({ message: `${error.code} - ${error.code}` });
}
