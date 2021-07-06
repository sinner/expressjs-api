import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import { successResponse } from '../../../util/default-response';
import { authorizationHeader } from '../../middleware/authorization-headers';

import dealsResponse from '../../../mocked-data/deals.json';
import dealSnapshotResponse from '../../../mocked-data/dealSnapshot.json';

// create router
export const controllerRouter = express.Router();

export const getDeals= async (req, res) => {
  res.status(200).json(successResponse(dealsResponse.deals));
};

export const getDealSnapshotInfo = async (req, res) => {
  res.status(200).json(successResponse(dealSnapshotResponse.dealSnapshotInfo));
};

export const getDealsIdSnapshot = async (req, res) => {
  const dealsIDs = dealsResponse.deals.map((item) => item.id);
  res.status(200).json(successResponse(dealsIDs));
};

controllerRouter.use(authorizationHeader);

/** @path /deals */
controllerRouter.get('/', getDeals);

/** @path /deals/snapshot-info */
controllerRouter.get('/snapshot-info', getDealSnapshotInfo);

/** @path /deals/deal-snapshot */
controllerRouter.get('/deal-snapshot', getDealsIdSnapshot);

// create and export default register controller function
const registerClientConfigController = registerControllerGenerator(controllerRouter);
export default registerClientConfigController;
