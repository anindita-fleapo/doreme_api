import { Request, Response } from "express";

export async function addToCart(req: Request, res: Response) {
  try {
    const { productId, quantity } = req.body as {
      productId: number;
      quantity: number;
    };
    console.log(req.body);

    await fetch(
      "https://dadd2d34b92dfccd718fcb0bc4216164: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@doremebusiness.myshopify.com/admin/api/2022-10/cart/add.js",
      { body: JSON.stringify([{ id: productId, quantity }]) }
    );
    return res.status(201).json({});
  } catch (error) {
    return handleError(res, error);
  }
}

function handleError(res: Response, error: any) {
  return res.status(500).send({ message: `${error.code} - ${error.code}` });
}
