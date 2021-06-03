import standardResponse from '../../util/standardize-response';
import config from '../../properties/config';

// eslint-disable-next-line consistent-return
export const authorizationHeader = (req, res, next) => {
  const authHeader = req.get(config.get('app:AUTH_TOKEN_LABEL'));
  if (!authHeader) {
    res.status(401).json(standardResponse({
      message: 'You must provide the authorization header',
      status: {
        statusCode: 401,
        success: false,
      },
      config: {
        filename: __filename,
        controller: `${__filename}`,
      },
      error: {
        name: 'AuthorizationHeaderNotFound',
        message: 'You must provide the authorization header',
        description: 'The authorization header was not provided',
      },
    }));
    return -1;
  }
  next();
};
