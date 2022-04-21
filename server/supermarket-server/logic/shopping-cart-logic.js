const shoppingCartsDao = require("../dao/shopping-carts-dao");

function generateShoppingCartId() {
  const randomId = Math.floor(Math.random() * 1000000);
  return randomId;
}

function generateNewShoppingCart(id) {
  const newShoppingCartInfo = {
    userId: id,
    cartDate: new Date().toDateString(),
    cartId: generateShoppingCartId(),
  };
  return newShoppingCartInfo;
}
 
async function getShoppingCart(userId) {
  const userShoppingCart = await shoppingCartsDao.isShoppingCartAlreadyExists(
    userId
  );

  if (
    userShoppingCart[0].cartCount == null ||
    userShoppingCart[0].cartCount == 0
  ) {
    const newShoppingCartInfo = generateNewShoppingCart(userId);
    const newShoppingCart = await shoppingCartsDao.getNewShoppingCart(
      newShoppingCartInfo
    );
    return newShoppingCart;
  } else {
    const existsShoppingCart = await shoppingCartsDao.getExistShoppingCart(
      userId
    );
    const existsShoppingCartItems =
      await shoppingCartsDao.getExistsShoppimgCartItemList(
        existsShoppingCart.cartId
      );
    existsShoppingCart.cartItems = existsShoppingCartItems;
    return existsShoppingCart;
  }
}

async function addItemToShoppingCart(cartItem, shoppingCartId) {
  let serverCartItem = await shoppingCartsDao.isCartItemAlreadyExsits(
    cartItem,
    shoppingCartId
  );
  if (serverCartItem[0].itemCount == null || serverCartItem[0].itemCount == 0) {
    await shoppingCartsDao.addItemToShoppingCart(cartItem, shoppingCartId);
    const newItemMessage = "Successfully added to your shopping cart";
    return newItemMessage;
  }
}

async function updateShoppingCartItem(cartItem, shoppingCartId) {
  await shoppingCartsDao.updateShoppingCartItem(cartItem, shoppingCartId);
  const exsitsItemMessage = "Successfully updated  your shopping cart";
  return exsitsItemMessage;
}

async function deleteCartitem(productId, shoppingCartId) {
  await shoppingCartsDao.deleteCartitem(productId, shoppingCartId);
  const deleteItemMessage = "Successfully deleted from  your shopping cart";
  return deleteItemMessage;
}

async function deleteAllCartItems(shoppingCartId) {
  await shoppingCartsDao.deleteAllCartItems(shoppingCartId);
  const deleteItemMessage = "Your shopping cart is now empty";
  return deleteItemMessage;
}

async function deleteShoppingCart(shoppingCartId){
  await shoppingCartsDao.deleteAllCartItems(shoppingCartId);
  await shoppingCartsDao.deleteShoppingCart(shoppingCartId)
}

module.exports = {
  getShoppingCart,
  addItemToShoppingCart,
  updateShoppingCartItem,
  deleteCartitem,
  deleteAllCartItems,
  deleteShoppingCart,
};
