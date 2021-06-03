export default (req, res, next) => {
  const { path, method } = req;
  const message = `Invalid Route: path "${method} ${path}" not found`;
  const err = new Error(message);
  err.status = 404;
  next(err);
};
