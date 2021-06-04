import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import { successResponse } from '../../../util/default-response';
import { authorizationHeader } from '../../middleware/authorization-headers';

import portfolioResponse from '../../../mocked-data/portfolios.json';

// create router
export const controllerRouter = express.Router();

export const getAllPortfoliosRoute = async (req, res) => {
  res.status(200).json(successResponse(portfolioResponse.allPortfolios));
};

export const getMyPortfoliosRoute = async (req, res) => {
  res.status(200).json(successResponse(portfolioResponse.myPortfolios));
};

export const setDefaultPortfolio = async (req, res) => {
  res.status(200).json(successResponse());
};

export const deletePortfolio = async (req, res) => {
  res.status(200).json(successResponse());
};

controllerRouter.use(authorizationHeader);

/** @path /portfolios/all */
controllerRouter.get('/all', getAllPortfoliosRoute);
/** @path /portfolios/my-portfolios */
controllerRouter.get('/my-portfolios', getMyPortfoliosRoute);
/** @path /portfolios/set-portfolio-default */
controllerRouter.post('/set-portfolio-default', setDefaultPortfolio);
/** @path /portfolios/delete-portfolio */
controllerRouter.delete('/delete-portfolio', deletePortfolio);

// create and export default register controller function
const registerClientConfigController = registerControllerGenerator(controllerRouter);
export default registerClientConfigController;