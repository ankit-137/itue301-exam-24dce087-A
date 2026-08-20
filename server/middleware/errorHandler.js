/**
 * errorHandler — Global error-handling middleware
 *
 * Must be registered as the LAST middleware in the Express app.
 * Express identifies it as an error handler because it accepts 4 arguments: (err, req, res, next).
 *
 * Returns a structured JSON response instead of exposing the raw error stack.
 */
function errorHandler(err, req, res, next) {
  // Use the error's status code if available, otherwise default to 500
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    status:  statusCode,
    message: err.message || 'An unexpected server error occurred.',
    // Only expose the stack trace in development, never in production
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

module.exports = errorHandler;
