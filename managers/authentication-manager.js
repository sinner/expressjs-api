/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import config from '../properties/config';
import Logger from '../util/logger';
import errorResponse from '../util/standardize-error-response';
import authentication from '../mocked-data/authentication.json';

// eslint-disable-next-line no-unused-vars
const logger = Logger.getLogger(__filename);

class AuthenticationManager {
  constructor() {
    this.endpoints = config.get('endpoints:actualApi');
  }

  async login(credentials) {
    try {
      let response = authentication.login.invalid;
      if (this.areValidCredentials(credentials)) {
        response = authentication.login.success;
      }
      return response;
    } catch (error) {
      return errorResponse(error, {});
    }
  }

  areValidCredentials(credentials) {
    return authentication.validCredentials.username === credentials.username
      && authentication.validCredentials.password === credentials.password;
  }
}

export default new AuthenticationManager();
