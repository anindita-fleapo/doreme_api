require("dotenv").config({ path: "/src/.env" });
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { router } from "./routes/router";
import * as serviceAccount from "./crendintials.json";
import * as dotenv from "dotenv";

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
    projectId: serviceAccount.project_id,
  }),
  databaseURL: "https://doremebusiness-2024e.firebaseio.com",
});

import { deleteCart, getCart, updateCart } from "./controllers/carts";

//const db = admin.firestore();

const app = express();
dotenv.config();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use("/", router);
//routesConfig(app);

app.patch("/cart", updateCart);
app.get("/cart/:customerId", getCart);
app.delete("/cart", deleteCart);
exports.app = functions.https.onRequest(app);
export const api = functions.https.onRequest(app);

//export { admin, db };

/* export const getProducts = functions.https.onRequest(
  async (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    const data = await fetch(
      "https://b3d69b9f01e2019dc853644c65688c01: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@doremebusiness.myshopify.com/admin/api/2022-10/pro//ducts.json"
    ).then((e) => e.json());

    response.json(data);
  }
); */
