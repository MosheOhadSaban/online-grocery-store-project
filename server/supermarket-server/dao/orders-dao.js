const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getOrdersAmount() {
  let sql = "SELECT COUNT(1) AS ordersAmount FROM orders";

  try {
    const ordersAmount = await connection.execute(sql);
    return ordersAmount[0].ordersAmount;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), e);
  }
}

async function addOrder(orderInfo) {
  let sql =
    "INSERT INTO orders (id,total_price,delivery_city,delivery_street,delivery_date,order_date,credit_card_last_four_digits,shopping_carts_id,users_id) VALUES (?,?,?,?,?,?,?,?,?)";
  let parameters = [
    orderInfo.id,
    orderInfo.totalPrice,
    orderInfo.deliveryCity,
    orderInfo.deliveryStreet,
    orderInfo.deliveryDate,
    orderInfo.date,
    orderInfo.creditCardNumber,
    orderInfo.cartId,
    orderInfo.userId,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), e);
  }
}

async function getUserLastOrderDate(userId) {
  let sql =
    "SELECT order_date AS orderDate FROM orders WHERE users_id=? ORDER BY record_date DESC LIMIT 1";
  let parameters = [userId];

  try {
    const lastUserOrderDate = await connection.executeWithParameters(
      sql,
      parameters
    );
    if (lastUserOrderDate[0] == null) {
      return "";
    }
    return lastUserOrderDate[0].orderDate;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), e);
  }
}

module.exports = {
  getOrdersAmount,
  addOrder,
  getUserLastOrderDate,
};
