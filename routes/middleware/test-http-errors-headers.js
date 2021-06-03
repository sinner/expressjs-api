import standardResponse from '../../util/standardize-response';
import config from '../../properties/config';
import defaultResponse from '../../mocked-data/default.json';

const isValidHttErrorCode = (httpError) => {
  const { isInteger } = require('../../util/helper-functions');
  return isInteger(httpError) && defaultResponse.httpError[httpError];
};

// eslint-disable-next-line consistent-return
const testHttpErrorsHeader = (req, res, next) => {
  const httpErrorCode = req.get(config.get('app:TEST_HTTP_ERROR_CODE_LABEL'));
  const httErrorDesc = isValidHttErrorCode(httpErrorCode);
  if (httpErrorCode && httErrorDesc) {
    res.status(Number.parseInt(httpErrorCode)).json(standardResponse({
      ...defaultResponse[httErrorDesc],
      config: {
        filename: __filename,
        controller: `${__filename}`,
      },
    }));
    return -1;
  }
  next();
};

export default testHttpErrorsHeader;