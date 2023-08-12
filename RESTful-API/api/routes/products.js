const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const checkAuth=require('../middleware/check-auth')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid FileType or File Not send"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, //MB
  },
  fileFilter: fileFilter,
});
const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            _id: doc._id,
            request: {
              method: "GET",
              url: "http://localhost:3000/products/" + doc._id,
            },
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
});

router.post("/", checkAuth, upload.single("productImage"), (req, res, next) => {
  console.log(req.file); // due to multer middleware req has .file
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created product successfully!",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            method: "POST",
            url: "http://localhost:3000/products/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({
        error: err,
      });
    });
});

router.get("/:productsId", (req, res) => {
  const id = req.params.productsId;
  Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            method: "GET",
            description: "GET_ALL_PRODUCTS",
            url: "http://localhost:3000/product/",
          },
        });
      } else {
        res.status(404).json({
          message: "No item with this Id present",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/:productId", checkAuth, async (req, res, next) => {
  const props = req.body;
  try {
    await Product.updateOne({ _id: req.params.productId }, props).exec();

    res.status(200).json({
      message: "Product Updated",
      request: {
        type: "GET",
        url: "http://localhost:3000/products/" + req.params.productId,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.delete("/:productId", checkAuth, (req, res) => {
  const id = req.params.productId;
  Product.findByIdAndRemove({ _id: id })
    .exec()
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product Not found",
        });
      } else {
        return res.status(200).json({
          message: "Product Deleted",
          request: {
            method: "POST",
            url: "http://localhost:3000/products",
            body: { name: "String", price: "Number" },
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
