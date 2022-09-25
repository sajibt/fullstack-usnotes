const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ error: "Authorization secret token required" });
  }

  //spilit ther array  . 1st ne is Bearer 2nd one is token
  const token = authorization.split(" ")[1];

  try {
    //veryfi the token. take the id from jwt token
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "User is not authorized" });
  }
};

module.exports = checkAuth;
