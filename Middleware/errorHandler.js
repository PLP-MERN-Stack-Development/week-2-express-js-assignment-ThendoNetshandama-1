

module.exports = function (err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      name: err.name,
      message,
    },
  });
};
// This middleware handles errors in the Express application.
// It logs the error stack to the console and sends a JSON response with the error details.