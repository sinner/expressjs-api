import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import { successResponse } from '../../../util/default-response';
import { authorizationHeader } from '../../middleware/authorization-headers';

import dealSnapshotSummaryResponse from '../../../mocked-data/deal-snapshot--deal-summary.json';

import dealSnapshotResponse from '../../../mocked-data/dealSnapshot.json';

// create router
export const controllerRouter = express.Router();

export const getDealSummary= async (req, res) => {
  res.status(200).json(successResponse(dealSnapshotSummaryResponse));
};

export const getDealSnapshotInfo = async (req, res) => {
  let dealId = req.params;
  res.status(200).json(successResponse(dealSnapshotResponse.dealId));
};

controllerRouter.use(authorizationHeader);

/** @path /deal-snapshot/:deal/deal-summary */
controllerRouter.get('/:deal/deal-summary', getDealSummary);

/** @path /deal-snapshot/:deal */
controllerRouter.get('/:deal/', getDealSnapshotInfo);

// create and export default register controller function
export default registerControllerGenerator(controllerRouter);
