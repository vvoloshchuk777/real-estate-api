export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const data = err.data || {};

  res.status(statusCode).json({
    status: 'error',
    message,
    data,
  });
};
