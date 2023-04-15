const router = require("express").Router();
const verifyJwt = require("../middleware");
const { check } = require("express-validator");
const { getUsers, signup, login } = require("../controller");

router.post(
  "/signup",
  [
    check("email", "should be a valid email").isEmail(),
    check("password", "should be min 6-digit").isLength({ min: 6 }),
    check("username", "username is required, min 4char").isLength({ min: 4 }),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email", "should be a valid email").isEmail(),
    check("password", "should be min 6-digit").isLength({ min: 6 }),
  ],
  login
);

router.get("/", verifyJwt, getUsers);

module.exports = router;
