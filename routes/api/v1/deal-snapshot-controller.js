import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import { successResponse } from '../../../util/default-response';
import { authorizationHeader } from '../../middleware/authorization-headers';

import dealSnapshotSummaryResponse from '../../../mocked-data/deal-snapshot--deal-summary.json';
import dealSnapshotClassStructureResponse from '../../../mocked-data/deal-snapshot-class-structure.json';

import dealSnapshotResponse from '../../../mocked-data/dealSnapshot.json';

// create router
export const controllerRouter = express.Router();

export const getDealSummary= async (req, res) => {
  res.status(200).json(successResponse(dealSnapshotSummaryResponse));
};

export const getClassStructure= async (req, res) => {
  res.status(200).json(successResponse(dealSnapshotClassStructureResponse));

export const getDealSnapshotInfo = async (req, res) => {
  const dealId = req.params.deal;
  const dealInfoIndex = dealSnapshotResponse.dealSnapshotInfo.findIndex((item) => item.id == dealId);
  if (dealInfoIndex === -1) {
    res.status(200).json(successResponse(dealSnapshotResponse.dealSnapshotInfo[0]));
  } else {
    res.status(200).json(successResponse(dealSnapshotResponse.dealSnapshotInfo[dealInfoIndex]));
  }
  
};

controllerRouter.use(authorizationHeader);

/** @path /deal-snapshot/:deal/deal-summary */
controllerRouter.get('/:deal/deal-summary', getDealSummary);

/** @path /deal-snapshot/:deal */
controllerRouter.get('/:deal/', getDealSnapshotInfo);

/** @path /deal-snapshot/:deal/class-structure */
controllerRouter.get('/:deal/class-structure', getClassStructure);

// create and export default register controller function
export default registerControllerGenerator(controllerRouter);
