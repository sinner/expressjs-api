import { get } from 'lodash';
import config from '../properties/config';
import Logger from './logger';

const logger = Logger.getLogger(__filename);

export default (errorObj, request = null) => {
  const errorResponse = {
    status: {
      statusCode: get(errorObj, 'status', 500),
      success: false,
    },
    message: get(errorObj, 'message', 'Failed'),
    error: {
      name: errorObj.name,
      message: errorObj.message,
      stack: errorObj.stack,
      isAxiosError: errorObj.isAxiosError,
      config: errorObj.config,
      request,
    },
    time: (new Date()).toISOString(),
    version: config.get('app:version'),
  };

  logger.error(`${errorObj.name}: ${errorResponse.message} - ${errorObj.stack}`);

  return errorResponse;
};
