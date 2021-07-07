import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import { successResponse } from '../../../util/default-response';
import { authorizationHeader } from '../../middleware/authorization-headers';

import dealsResponse from '../../../mocked-data/deals.json';

// create router
export const controllerRouter = express.Router();

export const getDeals= async (req, res) => {
  res.status(200).json(successResponse(dealsResponse.deals));
};

export const getDealsIds = async (req, res) => {
  const dealsIDs = dealsResponse.deals.map((item) => ({id: item.id, text: item.id}));
  res.status(200).json(successResponse(dealsIDs));
};

controllerRouter.use(authorizationHeader);

/** @path /deals */
controllerRouter.get('/', getDeals);

/** @path /deals/deal-ids */
controllerRouter.get('/deal-ids', getDealsIds);

// create and export default register controller function
const registerClientConfigController = registerControllerGenerator(controllerRouter);
export default registerClientConfigController;
