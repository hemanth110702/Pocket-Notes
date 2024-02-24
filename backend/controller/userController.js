const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const joiPasswordComplexity = require("joi-password-complexity");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { error } = validateUserCredentials(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  try {
    const {
      error: loginError,
      message,
      user,
    } = await User.login(email, password);
    if (loginError) return res.status(400).send(message);

    const token = await createToken(user._id);
    return res.status(200).json({ email, token });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const signupUser = async (req, res) => {
  const { error } = validateUserCredentials(req.body);
  if (error)return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  const valid = await User.findOne({ email });
  if (valid) return res.status(400).send("email already in use");

  try {
    const {
      error: signupError,
      message,
      user,
    } = await User.signup(email, password);
    if (signupError) return res.status(500).send(message);
    const token = await createToken(user._id);
    return res.status(200).json({ email, token });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

function validateUserCredentials(data) {
  const joiSchema = Joi.object({
    email: Joi.string().email().required(),
    password: joiPasswordComplexity().required(),
  });
  return joiSchema.validate(data);
}

module.exports = { loginUser, signupUser };
