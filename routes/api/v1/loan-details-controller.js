import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import { successResponse } from '../../../util/default-response';
import { authorizationHeader } from '../../middleware/authorization-headers';

import loanDetailsLoanDataResponse from '../../../mocked-data/loan-details-loan-data.json';
import loanDetailsFinancialResponse from '../../../mocked-data/loan-details-financials-data.json';
import sharedDocmentResponse from '../../../mocked-data/shared-documents.json';

// create router
export const controllerRouter = express.Router();

export const getLoanData = async (req, res) => {
  res.status(200).json(successResponse(loanDetailsLoanDataResponse));
};
export const getFinancial = async (req, res) => {
  res.status(200).json(successResponse(loanDetailsFinancialResponse));
};
export const getSharedDocuments = async (req, res) => {
  res.status(200).json(successResponse(sharedDocmentResponse));
};
export const uploadSharedDocuments = async (req, res) => {
  res.status(200).json(successResponse(sharedDocmentResponse));
};


controllerRouter.use(authorizationHeader);

/** @path /loan-details/:deal/loan-data */
controllerRouter.get('/:deal/loan-data', getLoanData);
/** @path /loan-details/:loan/financial */
controllerRouter.get('/:loan/financial', getFinancial);
/** @path /loan-details/:loan/shared-documents */
controllerRouter.get('/:loan/shared-documents', getSharedDocuments);
/** @path /loan-details/:loan/shared-documents */
controllerRouter.post('/:loan/shared-documents', uploadSharedDocuments);


// create and export default register controller function
export default registerControllerGenerator(controllerRouter);