const express = require("express");
const router = express.Router();
const jwt_decode = require("jwt-decode");
const shoppingCartLogic = require("../logic/shopping-cart-logic");

router.get("/", async (request, response, next) => {
  const userToken = request.headers.authorization;
  const decodedToken = jwt_decode(userToken);
  userId = decodedToken.id;

  try {
    const shoppingCart = await shoppingCartLogic.getShoppingCart(userId);
    response.json(shoppingCart);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (request, response, next) => {
  let cartItem = request.body.cartItem;
  let shoppingCartId = request.body.shoppingCartId;

  try {
    const serverMessage = await shoppingCartLogic.addItemToShoppingCart(
      cartItem,
      shoppingCartId
    );
    response.json(serverMessage);
  } catch (error) {
    return next(error);
  }
});

router.put("/", async (request, response, next) => {
  let cartItem = request.body.cartItem;
  let shoppingCartId = request.body.shoppingCartId;
  try {
    const serverMessage = await shoppingCartLogic.updateShoppingCartItem(
      cartItem,
      shoppingCartId
    );
    response.json(serverMessage);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:cartId/:productId", async (request, response, next) => {
  let productId = request.params.productId;
  let shoppingCartId = request.params.cartId;
  console.log(request.params)

  try {
    const serverMessage = await shoppingCartLogic.deleteCartitem(
      productId,
      shoppingCartId
    );
    response.json(serverMessage);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:emptyCartId", async (request, response, next) => {
  let shoppingCartId = request.params.emptyCartId;

  try {
    const serverMessage = await shoppingCartLogic.deleteAllCartItems(
      shoppingCartId
    );
    response.json(serverMessage);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  let shoppingCartId = request.params.id;

  try {
    await shoppingCartLogic.deleteShoppingCart(shoppingCartId);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
