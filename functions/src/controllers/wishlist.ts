import { Response } from "express";
import { db } from "../util/db";

type wishlistType = {
  title: string;
  productId: number;
  customerId: number;
  varients: string;
};

type Request = {
  body: wishlistType;
  params: { itemId: string };
};

const updateWishlist = async (req: Request, res: Response) => {
  const {
    body: { productId, customerId, title },
  } = req;

  try {
    const wishlist = db.collection("wishlist");

    const currentData =
      (await wishlist
        .where("productId", "==", productId)
        .where("customerId", "==", customerId)
        .get()) || {};
    if (currentData.size > 0) {
      currentData.forEach((doc) => {
        wishlist.doc(doc.id).update({
          title,
        });
      });
    } else {
      const wishlistObj = {
        title,
        productId,
        customerId,
      };
      wishlist.doc().set(wishlistObj);
    }

    return res.status(200).json({
      status: "success",
      message: "cart update successfully",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

const deleteWishlist = async (req: Request, res: Response) => {
  const {
    body: { productId, customerId },
  } = req;

  try {
    const wishlist = db.collection("Wishlist");

    const currentData =
      (await wishlist
        .where("productId", "==", productId)
        .where("customerId", "==", customerId)
        .get()) || {};
    if (currentData.size > 0) {
      currentData.forEach((doc) => {
        wishlist.doc(doc.id).delete();
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

const getWishlist = async (req: Request, res: Response) => {
  const {
    body: { customerId },
  } = req;

  try {
    const wishlist = db.collection("wishlist");

    const currentData =
      (await wishlist.where("customerId", "==", customerId).get()) || {};

    const responsedata: any[] = [];
    currentData.forEach((doc) => {
      responsedata.push(doc.data());
    });
    return res.status(200).json({ data: responsedata });
  } catch (error) {
    return handleError(res, error);
  }
};

export { updateWishlist, deleteWishlist, getWishlist };

function handleError(res: Response, error: any) {
  console.log(error);
  return res.status(500).send({ message: `${error.code} - ${error.code}` });
}
