const express = require("express");
const router = express.Router();
const productsLogic = require("../logic/products-logic");
const jwt_decode = require("jwt-decode");

router.get("/", async (request, response, next) => {
  try {
    let productsList = await productsLogic.getProductList();
    response.json(productsList);
  } catch (error) {
    return next(error);
  }
});

router.get("/categories", async (request, response, next) => {
  try {
    let categoriesData = await productsLogic.getCategoriesData();
    response.json(categoriesData);
  } catch (error) {
    return next(error);
  }
});

router.get("/list", async (request, response, next) => {
  try {
    let productsData = await productsLogic.getProductsDataList();
    response.json(productsData);
  } catch (error) {
    return next(error);
  }
});

router.put("/edit-product", async (request, response, next) => {
  const userToken = request.headers.authorization;
  const decodedToken = jwt_decode(userToken);
  userInfo = decodedToken;
  const product = request.body;

  try {
    const serverMessage = await productsLogic.editProduct(userInfo, product);
    response.json(serverMessage);
  } catch (error) {
    return next(error);
  }
});
router.post("/add-product", async (request, response, next) => {
  const userToken = request.headers.authorization;
  const decodedToken = jwt_decode(userToken);
  userInfo = decodedToken;
  const product = request.body;

  try {
    const serverMessage = await productsLogic.addProduct(userInfo, product);
    response.json(serverMessage);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
