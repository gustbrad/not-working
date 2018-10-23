require("dotenv");
const db = require("../../models");
const router = require("express").Router();
const musiciansController = require("../../controller/musiciansController");
const User = require('../../models/user');
//const passport = require('../../passport');

// Matches with "/api/musicians"
router.route(`/:APIkey=${process.env.APIkey}`)
  .get(musiciansController.search)
  .post(musiciansController.create);

// Matches with "/api/musicians/:id"
router
  .route(`/:id/:APIkey=${process.env.APIkey}`)
  .get(musiciansController.findById)
  .put(musiciansController.update)
  .delete(musiciansController.remove);

// router.route(`/signup`)
//   .post(musiciansController.signup)
//   .get(musiciansController.login);

module.exports = router;