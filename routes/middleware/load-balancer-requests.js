/* eslint-disable no-param-reassign */
const loadBalancerMiddleware = (req, res, next) => {
  // this is a horrible hack but still valid because we force https connections
  // earlier, and the aws load balancers seem to overwrite our x-forwarded-proto headers
  req.headers['x-forwarded-proto'] = 'https';
  req.headers['X-Forwarded-Proto'] = 'https';
  next();
};

module.exports = loadBalancerMiddleware;
