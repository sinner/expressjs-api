import express from 'express';
import get from 'lodash/get';
import multer from 'multer';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import { successResponse } from '../../../util/default-response';
import errorResponse from '../../../util/standardize-error-response';
import { authorizationHeader } from '../../middleware/authorization-headers';
import MultiPortfolioManager from '../../../managers/multi-portfolio-manager';

import portfolioResponse from '../../../mocked-data/portfolios.json';
import defaultResponse from '../../../mocked-data/default.json';

// create router
export const controllerRouter = express.Router();

export const validateFileForCreationRoute = async (req, res) => {
  const validationResult = await MultiPortfolioManager.validateFile(req.file);
  let responseFactory = successResponse;
  let statusCode = 200;
  if (validationResult.error) {
    statusCode = 400
    responseFactory = errorResponse;
  }
  res.status(statusCode).json(responseFactory(validationResult));
};


export const createMultiPortfolioRoute = async (req, res) => {
  const response = defaultResponse.successCreation;
  response.data = req.body;
  res.status(201).json(response);
};

controllerRouter.use(authorizationHeader);

/** @path /multi-portfolios */
controllerRouter.post('/', createMultiPortfolioRoute);
/** @path /multi-portfolios/file-validation */
controllerRouter.post('/file-validation', multer().single('file'), validateFileForCreationRoute);

// create and export default register controller function
const registerMultiPortfolioConfigController = registerControllerGenerator(controllerRouter);
export default registerMultiPortfolioConfigController;