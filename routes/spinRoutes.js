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

// router.get(
//   "/",
//   protect,
//   spinWheel
// );

// router.get(
//   "/history",
//   protect,
//   getSpinHistory
// );





module.exports =
  router;
