// # routes / spinRoutes.js

const express =
  require("express");

const router =
  express.Router();

const protect =
  require(
    "../middleware/authMiddleware"
  );

const {
  spinWheel,
} = require(
  "../controllers/spinController"
);



// 🎰 SPIN API

router.post(
  "/spin",
  protect,
  spinWheel
);



module.exports =
  router;
