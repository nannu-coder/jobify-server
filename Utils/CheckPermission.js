const UnAuthenticatedError = require("../Errors/unAuthenticated");

const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnAuthenticatedError("Not authorized to access this route");
};

module.exports = checkPermission;
