import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import { successResponse } from '../../../util/default-response';
import { authorizationHeader } from '../../middleware/authorization-headers';

import dealSnapshotResponse from '../../../mocked-data/deal-snapshot--deal-summary.json';

// create router
export const controllerRouter = express.Router();

export const getDealSummary= async (req, res) => {
  res.status(200).json(successResponse(dealSnapshotResponse));
};

controllerRouter.use(authorizationHeader);

/** @path /deal-snapshot/:deal/deal-summary */
controllerRouter.get('/:deal/deal-summary', getDealSummary);

// create and export default register controller function
export default registerControllerGenerator(controllerRouter);
