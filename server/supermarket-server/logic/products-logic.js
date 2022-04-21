const productsDao = require("../dao/products-dao");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getProductList() {
  let productsList = await productsDao.getProductList();
  return productsList;
}

async function getCategoriesData() {
  let categoriesData = await productsDao.getCategoriesData();
  return categoriesData;
}

async function getProductsDataList() {
  let productsData = await productsDao.getProductsDataList();
  return productsData;
}

async function editProduct(userInfo, product) {
  console.log(userInfo)

  if (userInfo.userType != "ADMIN") {
    throw new ServerError(ErrorType.USER_UNAUTHORIZED);
  }
  await productsDao.editProduct(product);
  const serverMessage = "The product successfully updated";
  return serverMessage
}

async function addProduct(userInfo, product) {
  console.log(userInfo)

  if (userInfo.userType != "ADMIN") {
    throw new ServerError(ErrorType.USER_UNAUTHORIZED);
  }
  await productsDao.addProduct(product);
  const serverMessage = "The product successfully added";
  return serverMessage
}

module.exports = {
  getProductList,
  getCategoriesData,
  getProductsDataList,
  editProduct,
  addProduct,
};
