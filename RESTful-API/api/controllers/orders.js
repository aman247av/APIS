const Order = require("../models/order");
const Product = require("../models/product");
const mongoose = require("mongoose");

exports.orders_get_all = (req, res) => {
  Order.find()
    .select("product quantity _id")
    .populate("product") //populate product ref
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_creste_order = (req, res) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "No product with this id",
        });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity,
      });

      return order.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Order placed",
        createdOrder: {
          _id: result._id,
          productId: result.product,
          quantity: result.quantity,
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_get_by_orderId = (req, res) => {
  Order.findById(req.params.orderId)
    .populate("product")
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: `No order found with the ID of ${req.params.orderId}`,
        });
      } else {
        return res.status(200).json({
          productId: order.product,
          quantity: order.quantity,
          request: {
            method: "GET",
            description: "GET_ALL_ORDERS",
            url: "http://localhost:3000/orders/",
          },
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_deleteById = (req, res) => {
  const id = req.params.orderId;
  Order.findByIdAndRemove({ _id: id })
    .exec()
    .then((order) => {
      if (!order) {
        res.status(404).json({
          message: `No order with the ID of ${id}`,
        });
      } else {
        return res.status(200).json({
          message: "Order Deleted",
          request: {
            method: "POST",
            url: "http://localhost:3000/orders",
            body: { productId: "ID", quantity: "Number" },
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
};
