const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function isShoppingCartAlreadyExists(userId) {
  let sql = "SELECT COUNT(1) as cartCount FROM shopping_carts WHERE users_id=?";
  let parameters = [userId];

  try {
    const userShoppingCart = connection.executeWithParameters(sql, parameters);
    return userShoppingCart;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
  }
}

async function getNewShoppingCart(newShoppingCartInfo) {
  let sql =
    "INSERT INTO shopping_carts (id, cart_date, users_id)  values(?, ?, ?)";
  let parameters = [
    newShoppingCartInfo.cartId,
    newShoppingCartInfo.cartDate,
    newShoppingCartInfo.userId,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
    newShoppingCartInfo.cartItems = [];
    return newShoppingCartInfo;
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(newShoppingCartInfo),
      e
    );
  }
}

async function getExistShoppingCart(userId) {
  let sql =
    "SELECT id AS cartId, cart_date As cartDate, users_id As userId FROM  shopping_carts WHERE users_id=?";
  let parameters = [userId];

  try {
    const shoppingCart = await connection.executeWithParameters(
      sql,
      parameters
    );
    shoppingCart[0].cartItems = [];
    return shoppingCart[0];
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), e);
  }
}

async function isCartItemAlreadyExsits(cartItem, shoppingCartId) {
  let sql =
    "SELECT COUNT(1) as itemCount FROM carts_items WHERE products_id=? AND shopping_carts_id=?";
  let parameters = [cartItem.productId, shoppingCartId];

  try {
    const cartItem = await connection.executeWithParameters(sql, parameters);
    return cartItem;
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(cartItem.shoppingCartId),
      e
    );
  }
}

async function addItemToShoppingCart(cartItem, shoppingCartId) {
  let sql =
    "INSERT INTO carts_items (quantity ,quantity_price ,products_id ,shopping_carts_id) values(?,?,?,?)";
  let parameters = [
    cartItem.quantity,
    cartItem.quantityPrice,
    cartItem.productId,
    shoppingCartId,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartItem), e);
  }
}

async function updateShoppingCartItem(cartItem, shoppingCartId) {
  let sql =
    "UPDATE carts_items SET quantity=?, quantity_price=? WHERE products_id=? AND shopping_carts_id";
  let parameters = [
    cartItem.quantity,
    cartItem.quantityPrice,
    cartItem.productId,
    shoppingCartId,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(cartItem, shoppingCartId),
      e
    );
  }
}

async function getExistsShoppimgCartItemList(shoppingCartId) {
  let sql =
    "SELECT products.name AS productName ,products.id AS productId,carts_items.quantity AS quantity ,carts_items.quantity_price AS quantityPrice , products.img_path AS imagePath FROM carts_items INNER JOIN products ON products.id=carts_items.products_id WHERE carts_items.shopping_carts_id=?";
  let parameters = [shoppingCartId];

  try {
    const cartItem = await connection.executeWithParameters(sql, parameters);
    return cartItem;
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(shoppingCartId),
      e
    );
  }
}

async function deleteCartitem(productId, shoppingCartId) {
  let sql =
    "DELETE FROM carts_items WHERE products_id=? AND shopping_carts_id=?";
  let parameters = [productId, shoppingCartId];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(productId, shoppingCartId),
      e
    );
  }
}

async function deleteAllCartItems(shoppingCartId) {
  let sql = "DELETE FROM carts_items WHERE shopping_carts_id=?";
  let parameters = [shoppingCartId];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(productId, shoppingCartId),
      e
    );
  }
}

async function deleteShoppingCart(shoppingCartId) {
  let sql = "DELETE FROM shopping_carts WHERE id=?";
  let parameters = [shoppingCartId];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(shoppingCartId),
      e
    );
  }
}

module.exports = {
  isShoppingCartAlreadyExists,
  getNewShoppingCart,
  getExistShoppingCart,
  isCartItemAlreadyExsits,
  addItemToShoppingCart,
  updateShoppingCartItem,
  getExistsShoppimgCartItemList,
  deleteCartitem,
  deleteAllCartItems,
  deleteShoppingCart,
};
