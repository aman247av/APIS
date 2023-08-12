const express = require("express"); // provides a set of tools and features that simplify the process of building web applications and APIs (Routing,Middleware, Req and Resp,Static File Serving)
const app = express();
const morgan = require("morgan"); // logging package
const bodyParser = require("body-parser"); // is to extract this data from the request body, parse it into a usable format, and make it accessible to your application code.
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");

const user = require("./api/models/user");


mongoose.connect(
  "mongodb+srv://av24aman:" +
    process.env.MONGO_ATLAS_PW +
    "@api-db-cluster-1.pgss48j.mongodb.net/?retryWrites=true&w=majority"
).then(() => console.log("Database connected!"));

//Middleware: Express uses middleware functions to handle various tasks such as authentication, logging, request parsing, and error handling. Middleware functions can be chained together to create a pipeline that processes incoming requests.
app.use(morgan("dev")); //log
app.use('/uploads',express.static('uploads'))  // make uploads folder publically available
app.use(bodyParser.urlencoded({ extended: true })); //extract urlencoded data
app.use(bodyParser.json());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use('/users',userRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, Authorization"
    );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH,GET,DELETE");
    return res.sendStatus(200).json({});
  }
  next();
});

//Handling errors
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
