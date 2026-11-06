const checkRequest = (req, res, next) => {
  console.log("Request received.");

  next();
}

module.exports = checkRequest;