const ordersDao = require("../dao/orders-dao");

function generateOrderId() {
  const randomId = Math.floor(Math.random() * 1000000);
  return randomId;
}

async function getOrdersAmount() {
  const ordersAmount = await ordersDao.getOrdersAmount();
  return ordersAmount;
}



async function addOrder(orderInfo) {
  orderInfo.id = generateOrderId();
  await ordersDao.addOrder(orderInfo);
  const serverResponse = "Your order was placed successfully";
  return serverResponse;
}

async function getUserLastOrderDate(userId) {
  const userLastOrder = await ordersDao.getUserLastOrderDate(userId);
  return userLastOrder;
}

module.exports = {
  getOrdersAmount,
  getUserLastOrderDate,
  addOrder,
};
