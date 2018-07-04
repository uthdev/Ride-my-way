
export const clientErrorHandler = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.json({ message: 'Page not found' });
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  res.status(500 || 503).json({
    message: 'Error, your request could not  be processed at the moment',
  });
};
