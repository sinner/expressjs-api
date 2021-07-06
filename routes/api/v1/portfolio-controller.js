import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import { successResponse } from '../../../util/default-response';
import { authorizationHeader } from '../../middleware/authorization-headers';

import portfolioResponse from '../../../mocked-data/portfolios.json';
import portfolioDetail from '../../../mocked-data/portfolioDetail.json';

// create router
export const controllerRouter = express.Router();

export const getAllPortfoliosRoute = async (req, res) => {
  res.status(200).json(successResponse(portfolioResponse.allPortfolios));
};

export const getAllPortfoliosDealSnapshot= async (req, res) => {
  const allPortfolios = {
    id: 0,
    portfolioName: "All Deals",
    thirtyPct: 95,
    sixtyPct: 32,
    ninetyPct: 67,
    FC: 31,
    portfolioReport: false
  };
  const newPortfolioData = [{...portfolioResponse.allPortfolios}];
  newPortfolioData.unshift(allPortfolios);
  res.status(200).json(successResponse(newPortfolioData));
};

export const getMyPortfoliosRoute = async (req, res) => {
  res.status(200).json(successResponse(portfolioResponse.myPortfolios.slice(0, 12)));
};

export const getDefaultPortfolio = async (req, res) => {
  res.status(200).json(successResponse(portfolioResponse.myPortfolios[0]));
};

export const setDefaultPortfolio = async (req, res) => {
  res.status(200).json(successResponse());
};

export const savePortfolio = async (req, res) => {
  res.status(200).json(successResponse());
};

export const deletePortfolio = async (req, res) => {
  res.status(200).json(successResponse());
};

export const getPortfolio = async (req, res) => {
  const portfolioID = req.query.id;
  const indexPortfolio = portfolioResponse.myPortfolios.findIndex((item) => item.id == portfolioID );
  const portfolioSelected = { 
    ...(parseInt(portfolioID) === 1 && { default: true }),
    ...portfolioResponse.myPortfolios[indexPortfolio],
    ...portfolioDetail
    
  };
  res.status(200).json(successResponse(portfolioSelected));
};

controllerRouter.use(authorizationHeader);

/** @path /portfolios/all */
controllerRouter.get('/all', getAllPortfoliosRoute);
/** @path /portfolios/deal-snapshot */
controllerRouter.get('/deal-snapshot', getAllPortfoliosDealSnapshot);
/** @path /portfolios/my-portfolios */
controllerRouter.get('/my-portfolios', getMyPortfoliosRoute);
/** @path /portfolios//get-default-portfolio */
controllerRouter.get('/get-default-portfolio', getDefaultPortfolio);
/** @path /portfolios/set-portfolio-default */
controllerRouter.post('/set-portfolio-default', setDefaultPortfolio);
/** @path /portfolios/delete-portfolio */
controllerRouter.delete('/delete-portfolio', deletePortfolio);
/** @path /portfolios/portfolio?id */
controllerRouter.get('/portfolio', getPortfolio);
/** @path /portfolios/save-portfolio */
controllerRouter.put('/save-portfolio', savePortfolio);


// create and export default register controller function
const registerClientConfigController = registerControllerGenerator(controllerRouter);
export default registerClientConfigController;