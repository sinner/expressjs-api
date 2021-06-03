import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import { successResponse } from '../../../util/default-response';
import { authorizationHeader } from '../../middleware/authorization-headers';

import alertsResponse from '../../../mocked-data/alerts.json';

// create router
export const controllerRouter = express.Router();

export const getAlertsRoute = async (req, res) => {
  res.status(200).json(successResponse(alertsResponse.alerts));
};

controllerRouter.use(authorizationHeader);

/** @path /alerts */
controllerRouter.get('/', getAlertsRoute);

// create and export default register controller function
const registerClientConfigController = registerControllerGenerator(controllerRouter);
export default registerClientConfigController;
