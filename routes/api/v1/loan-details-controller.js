import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import { successResponse } from '../../../util/default-response';
import { authorizationHeader } from '../../middleware/authorization-headers';

import loanDetailsLoanDataResponse from '../../../mocked-data/loan-details-loan-data.json';

// create router
export const controllerRouter = express.Router();

export const getLoanData = async (req, res) => {
  res.status(200).json(successResponse(loanDetailsLoanDataResponse));
};

controllerRouter.use(authorizationHeader);

/** @path /loan-details/:deal/loan-data */
controllerRouter.get('/:deal/loan-data', getLoanData);

// create and export default register controller function
const registerClientConfigController = registerControllerGenerator(controllerRouter);
export default registerClientConfigController;