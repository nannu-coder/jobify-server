const UnAuthenticatedError = require("../Errors/unAuthenticated");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userID };

    next();
  } catch (error) {
    console.log(error);
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

module.exports = authenticate;
