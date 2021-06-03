import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import standardResponse from '../../../util/standardize-response';
import { authorizationHeader } from '../../middleware/authorization-headers';
import UserManager from '../../../managers/user-manager';

// create router
export const controllerRouter = express.Router();

/**
 * Get user information
 *
 * @param {*} req
 * @param {*} res
 */
export const getUserInfoRoute = async (req, res) => {
  const tokenHeader = config.get('app:AUTH_TOKEN_LABEL');

  const userInfoResponse = await UserManager.getUserInfo({
    token: req.get(tokenHeader),
  });

  res.status(get(userInfoResponse, 'status.statusCode', 500)).json(standardResponse({
    ...userInfoResponse,
    config: {
      ...userInfoResponse.config,
      filename: __filename,
      controller: `${__filename}:getUserInfoRoute`,
    },
  }));
};

controllerRouter.use(authorizationHeader);

/** @path /users/info */
controllerRouter.get('/', getUserInfoRoute);

// create and export default register controller function
const registerClientConfigController = registerControllerGenerator(controllerRouter);
export default registerClientConfigController;
