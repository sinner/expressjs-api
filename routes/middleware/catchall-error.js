/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

import logger from '../../util/logger';
import config from '../../properties/config';
import errorResponse from '../../util/standardize-error-response';

const { UI_REQUEST_ID } = config.get('app');

const l = logger.getLogger(__filename);

export default (err, req, res, next) => {
  const requestId = (req.headers && req.headers[UI_REQUEST_ID]) || null;
  err.requestId = requestId;
  l.debug(err);
  // special handling of xsrf errors
  if (err.code === 'EBADCSRFTOKEN') { return res.status(403).json({ error: 'csrftoken' }); }
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: {
      statusCode,
      success: false,
    },
    ...errorResponse(err),
  });
};
