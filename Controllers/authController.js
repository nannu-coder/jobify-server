const BadRequestError = require("../Errors/bad-request");
const UnAuthenticatedError = require("../Errors/unAuthenticated");
const User = require("../Models/userModel");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    throw new BadRequestError("Please Provide All values");
  }

  const alreadyExits = await User.findOne({ email });

  if (alreadyExits) {
    throw new BadRequestError("Email already exists");
  }

  const user = await User.create({ name, email, password });

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const token = await user.createJWT();
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateuser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  // various setups
  // in this case only id
  // if other properties included, must re-generate

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};
const logout = (req, res) => {
  res.send("logout");
};

module.exports = { register, login, updateuser, logout };
