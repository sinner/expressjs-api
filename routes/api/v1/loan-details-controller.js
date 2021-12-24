import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import { successResponse } from '../../../util/default-response';
import { authorizationHeader } from '../../middleware/authorization-headers';

import loanDetailsLoanDataResponse from '../../../mocked-data/loan-details-loan-data.json';
import loanDetailsFinancialResponse from '../../../mocked-data/loan-details-financials-data.json';
import sharedDocmentResponse from '../../../mocked-data/shared-documents.json';
import privateNotesResponse from '../../../mocked-data/private-notes.json';
import sharedNotesResponse from '../../../mocked-data/shared-notes.json';

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
export const getPrivateNotes = async (req, res) => {
  res.status(200).json(successResponse(privateNotesResponse));
};
export const getSharedNotes = async (req, res) => {
  res.status(200).json(successResponse(sharedNotesResponse));
};
export const addPrivateNote = async (req, res) => {
  res.status(200).json(successResponse());
};
export const deleteSharedNote = async (req, res) => {
  res.status(200).json(successResponse());
};
export const editSharedNote = async (req, res) => {
  res.status(200).json(successResponse());
};
export const addSharedNote = async (req, res) => {
  res.status(200).json(successResponse());
};

controllerRouter.use(authorizationHeader);

/** @path /loan-details/:deal/loan-data */
controllerRouter.get('/:deal/loan-data', getLoanData);
/** @path /loan-details/:loan/financial */
controllerRouter.get('/:loan/financial', getFinancial);
/** @path /loan-details/:loan/shared-documents */
controllerRouter.get('/:loan/shared-documents', getSharedDocuments);
/** @path /loan-details/:loan/shared-documents */
controllerRouter.post('/upload-documents', uploadSharedDocuments);
/** @path /loan-details/:loan/private-notes */
controllerRouter.get('/:loan/private-notes', getPrivateNotes);
/** @path /loan-details/:loan/shared-notes */
controllerRouter.get('/:loan/shared-notes', getSharedNotes);
/** @path /loan-details/:loan/edit-shared-notes */
controllerRouter.get('/:loan/edit-shared-notes', editSharedNote);
/** @path /loan-details/:loan/delete-shared-notes */
controllerRouter.get('/:loan/delete-shared-notes', deleteSharedNote);
/** @path /loan-details/:loan/add-private-notes */
controllerRouter.get('/:loan/add-private-notes', addPrivateNote);


// create and export default register controller function
export default registerControllerGenerator(controllerRouter);