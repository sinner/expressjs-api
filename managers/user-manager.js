/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import config from '../properties/config';
import Logger from '../util/logger';
import errorResponse from '../util/standardize-error-response';
import defaultResponse from '../mocked-data/default.json';
import userResponse from '../mocked-data/user.json';

// eslint-disable-next-line no-unused-vars
const logger = Logger.getLogger(__filename);

class UserManager {
  constructor() {
    this.endpoints = config.get('endpoints:actualAPI');
  }

  async getUserInfo(tokenObj) {
    try {
      let response = userResponse.invalid;

      if (tokenObj.token === 'EYtH1S1S4t0K3n') {
        response = userResponse.success;
      }
      return response;
    } catch (error) {
      return errorResponse(error, requestOptions);
    }
  }

  async usersForgotPassword(headers, payload) {
    try {
      const response = defaultResponse.success;
      return response;
    } catch (error) {
      return errorResponse(error, requestOptions);
    }
  }

  async logout(tokenObj) {
    try {
      const response = defaultResponse.success;
      return response;
    } catch (error) {
      return errorResponse(error, requestOptions);
    }
  }
}

export default new UserManager();
