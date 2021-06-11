import standardResponse from '../../util/standardize-response';
import config from '../../properties/config';

// eslint-disable-next-line consistent-return
export const authenticationHeader = (req, res, next) => {
  const username = req.body[config.get('app:AUTH_USERNAME_LABEL')];
  const password = req.body[config.get('app:AUTH_PASSWORD_LABEL')];
  if (!username || !password) {
    res.status(401).json(standardResponse({
      message: 'You must provide the user credentials',
      status: {
        statusCode: 401,
        success: false,
      },
      config: {
        filename: __filename,
        controller: `${__filename}:getAppKeys`,
      },
      error: {
        name: 'AuthenticationCredentialHeadersNotFound',
        message: 'You must provide the user credentials',
        description: 'The authentication credential headers were not provided',
      },
    }));
    return -1;
  }
  next();
};
