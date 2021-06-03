const securityHeaders = (req, res, next) => {
  /* Setting server to null is to ensure that the server
  name from Apache is not visible to the user */
  res.header('Server', null);
  /* Clickjacking prevention: https://www.hacksplaining.com/prevention/click-jacking */
  res.header('Content-Security-Policy', "frame-ancestors 'none'");
  /* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security */
  res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.header('Pragma', 'no-cache');
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  /*
    prevent click-jacking by denying ability to render content in frame
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  */
  res.header('X-Frame-Options', 'DENY');
  next();
};

export default securityHeaders;
