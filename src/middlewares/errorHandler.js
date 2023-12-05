const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: "Not Found" });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: err.message });
};

module.exports = { notFoundHandler, errorHandler };
