const notFoundMiddleware = (_, res) => {
  res.status(404).send("Route Does Not Exist");
};

module.exports = notFoundMiddleware;
