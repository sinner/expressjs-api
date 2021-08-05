import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import standardResponse from '../../../util/standardize-response';
import { authorizationHeader } from '../../middleware/authorization-headers';
import usersMigrationListResponse from '../../../mocked-data/users-migration.json';

// create router
export const controllerRouter = express.Router();

/**
 * Get users migration list
 *
 * @param {*} req
 * @param {*} res
 */
export const getUsersMigrationRoute = async (req, res) => {
  
  const response = (req.query.empty) ? usersMigrationListResponse.empty : usersMigrationListResponse.success;

  res.status(200).json(standardResponse({
    ...response,
    config: {
      filename: __filename,
      controller: `${__filename}:getUsersMigrationRoute`,
      message: "Send the `empty` query parameter to get an empty array in the result. i.e. /user-management/users-migration?empty=true"
    },
  }));
};

controllerRouter.use(authorizationHeader);

/** @path /users/info */
controllerRouter.get('/users-migration', getUsersMigrationRoute);

// create and export default register controller function
const registerConfigController = registerControllerGenerator(controllerRouter);
export default registerConfigController;
