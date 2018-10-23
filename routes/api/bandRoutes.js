require("dotenv");
const router = require("express").Router();
const bandsController = require("../../controller/bandsController");

// Matches with "/api/bands"
router.route(`/:APIkey=${process.env.APIkey}`)
  .get(bandsController.search)
  .post(bandsController.create);

// Matches with "/api/bands/:id"
router
  .route(`/:id/:APIkey=${process.env.APIkey}`)
  .get(bandsController.findById)
  .put(bandsController.update)
  .delete(bandsController.remove);

module.exports = router;