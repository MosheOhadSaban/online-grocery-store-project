const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getProductList() {
  let sql =
    "SELECT products.id, products.name, products.price, products.img_path, products_categories.categorie_name, products_categories.id FROM products INNER JOIN products_categories ON products_categories.id=products.products_categories_id";

  try {
    let productsList = await connection.execute(sql);
    return productsList;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), error);
  }
}

async function getCategoriesData() {
  let sql = "SELECT * FROM products_categories;";

  try {
    let categoriesData = await connection.execute(sql);
    return categoriesData;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), error);
  }
}

async function getProductsDataList() {
  let sql =
    "SELECT id, name, price, amount AS amountByUnit, img_path As imagePath, unit_measurement AS unitMeasurement, products_categories_id AS categoryId FROM supermarket.products;";

  try {
    let productsData = await connection.execute(sql);
    return productsData;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), error);
  }
}

async function editProduct(product) {
  let sql =
    "UPDATE products SET name=?,price=?,img_path=?,amount=?,unit_measurement=?,products_categories_id=?  WHERE id = ?;";
  let parameters = [
    product.name,
    product.price,
    product.imagePath,
    product.amountByUnit,
    product.unitMeasurement,
    product.categoryId,
    product.id,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), error);
  }
}

async function addProduct(product) {
  console.log(product)


  let sql = "INSERT INTO products (name, price, img_path, amount, unit_measurement,products_categories_id) VALUES (?,?,?,?,?,?)";
  let parameters = [
    product.name,
    product.price,
    product.imagePath,
    product.amountByUnit,
    product.unitMeasurement,
    product.categoryId,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(), error);
  }
}

module.exports = {
  getProductList,
  getCategoriesData,
  getProductsDataList,
  editProduct,
  addProduct,
};
