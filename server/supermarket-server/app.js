const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const usersController = require("./controllers/users-controller");
const fileController = require("./controllers/file-controller");
const productsController = require("./controllers//products-controller");
const shoppingCartsController = require("./controllers/shopping-carts-controller");
const ordersController = require("./controllers/orders-controller");
const errorHandler = require("./errors/error-handler");
const authFilter = require("./middleware/auth-filter");
const fileUpload = require("express-fileupload");

app.use(fileUpload());
app.use(express.json({ limit: "2MB" }));
app.use(express.static("files"));
app.use(cors({ origin: "http://localhost:4200" }));
app.use(authFilter());
app.use(morgan("dev"));

app.use("/files", fileController);
app.use("/users", usersController);
app.use("/products", productsController);
app.use("/shopping-carts", shoppingCartsController);
app.use("/orders", ordersController);
app.use(errorHandler);

app.listen(8081, () => console.log("Listening on http://localhost:8081"));
