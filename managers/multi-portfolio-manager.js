/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import config from '../properties/config';
import Logger from '../util/logger';
import errorResponse from '../util/standardize-error-response';
import multiPortfolioData from '../mocked-data/multi-portfolio.json';
import includes from 'lodash/includes';

// eslint-disable-next-line no-unused-vars
const logger = Logger.getLogger(__filename);

class MultiPortfolioManager {
  constructor() {
    this.endpoints = config.get('endpoints:actualApi');
  }

  async validateFile(file) {
    try {
      let response = multiPortfolioData.validateFile.success;
      if (includes(file.originalname, 'InvalidFormat')) {
        response = multiPortfolioData.validateFile.invalidFormat;
      } else if (includes(file.originalname, 'Empty')) {
        response = multiPortfolioData.validateFile.emptyFile;
      } else if (includes(file.originalname, 'WithInvalidData')) {
        response = multiPortfolioData.validateFile.withInvalidData;
      }
      response.filename = file.originalname;
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

export default new MultiPortfolioManager();
