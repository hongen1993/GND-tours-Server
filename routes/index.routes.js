const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/tours", (req, res, next) => {
  res.json("Tours")
})

router.get("/aboutUs", (req, res, next) => {
  res.json("About us")
})

module.exports = router;
