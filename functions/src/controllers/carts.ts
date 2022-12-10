import { Response } from "express";
import { db } from "../util/db";

type cartType = {
  title: string;
  productId: number;
  customerId: number;
  variants: string;
};

type Request = {
  body: cartType;
  params: { customerId: string };
};

const updateCart = async (req: Request, res: Response) => {
  const {
    body: { productId, customerId, title },
  } = req;

  try {
    const cart = db.collection("cart");

    const currentData =
      (await cart
        .where("productId", "==", productId)
        .where("customerId", "==", customerId)
        .get()) || {};
    if (currentData.size > 0) {
      currentData.forEach((doc) => {
        cart.doc(doc.id).update({
          title,
        });
      });
    } else {
      const cartObj = {
        title,
        productId,
        customerId,
      };
      cart.doc().set(cartObj);
    }

    return res.status(200).json({
      status: "success",
      message: "cart update successfully",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

const deleteCart = async (req: Request, res: Response) => {
  const {
    body: { productId, customerId },
  } = req;

  try {
    const cart = db.collection("cart");

    const currentData =
      (await cart
        .where("productId", "==", productId)
        .where("customerId", "==", customerId)
        .get()) || {};
    if (currentData.size > 0) {
      currentData.forEach((doc) => {
        cart.doc(doc.id).delete();
      });
    }

    return res.status(200).json({
      status: "success",
      message: "cart delete successfully",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

const getCart = async (req: Request, res: Response) => {
  const {
    params: { customerId },
  } = req;

  try {
    const cart = db.collection("cart");

    const currentData =
      (await cart.where("customerId", "==", customerId).get()) || {};

    const responseData: any[] = [];
    currentData.forEach((doc) => {
      responseData.push(doc.data());
    });
    return res.status(200).json({ data: responseData });
  } catch (error) {
    return handleError(res, error);
  }
};

export { updateCart, deleteCart, getCart };

function handleError(res: Response, error: any) {
  console.log(error);
  return res.status(500).send({ message: `${error.code} - ${error.code}` });
}
