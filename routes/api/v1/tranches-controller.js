import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import { successResponse } from '../../../util/default-response';
import { authorizationHeader } from '../../middleware/authorization-headers';

import tranchesResponse from '../../../mocked-data/tranches.json';

// create router
export const controllerRouter = express.Router();

export const getTranches= async (req, res) => {
  res.status(200).json(successResponse(tranchesResponse.tranches));
};

export const selectedTranches= async (req, res) => {
  const selectedTranches = tranchesResponse.tranches.slice(1, 8);
  res.status(200).json(successResponse(selectedTranches));
};

export const selectedTranches= async (req, res) => {
  const selectedTranches = tranchesResponse.tranches.slice(1, 8);
  setTimeout(() => {
    res.status(200).json(successResponse(selectedTranches));
  }, 10000);
};

controllerRouter.use(authorizationHeader);

/** @path /tranches */
controllerRouter.get('/', getTranches);
/** @path /tranches/selected-tranches */
controllerRouter.get('/selected-tranches', selectedTranches);
/** @path /tranches/selected-tranches-test-time */
/** @description Endpoint to test */
controllerRouter.get('/selected-tranches-test-time', selectedTranchesTime);

// create and export default register controller function
const registerClientConfigController = registerControllerGenerator(controllerRouter);
export default registerClientConfigController;
