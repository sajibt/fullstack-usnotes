const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  //inside sign we pass 3 arguments 1. payload, 2. secret string 3. expiresdatee

  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "2d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    //new doc  from the static signup in model
    const user = await User.signin(email, password);

    // create a token and send back to it to the browser
    const token = createToken(user._id);

    res.status(200).json({ email, token, username });

    // res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    //new doc  from the static signup in model
    const user = await User.signup(email, password, username);

    // create a token and send back to it to the browser
    const token = createToken(user._id);

    res.status(200).json({ email, token, username });

    // res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //   res.json({
  //     message: "sign up controller",
  //   });

  //   json web tokeen have  3parts header payload  and signatture
  // signature is encoded verstion of secret key given by server
  // server  use the secret key . the payload and header to verify
  // the hashed signature  made from secret key  if they matched
  //   it gives the jwt header+payload = secret === sgnature
};

module.exports = { loginUser, signupUser };
