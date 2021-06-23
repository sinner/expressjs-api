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

controllerRouter.use(authorizationHeader);

/** @path /tranches */
controllerRouter.get('/', getTranches);

// create and export default register controller function
const registerClientConfigController = registerControllerGenerator(controllerRouter);
export default registerClientConfigController;
