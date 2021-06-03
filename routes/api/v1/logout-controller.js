import express from 'express';
import { get } from 'lodash';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import standardResponse from '../../../util/standardize-response';
import { authorizationHeader } from '../../middleware/authorization-headers';
import UserManager from '../../../managers/user-manager';

// create router
export const controllerRouter = express.Router();

/**
 * Logout user
 *
 * @param {*} req
 * @param {*} res
 */
export const logoutRoute = async (req, res) => {
  const tokenHeader = config.get('app:AUTH_TOKEN_LABEL');

  const authResponse = await UserManager.logout({
    [tokenHeader]: req.get(tokenHeader),
  });

  res.status(get(authResponse, 'status.statusCode', 500)).json(standardResponse({
    ...authResponse,
    config: {
      ...authResponse.config,
      filename: __filename,
      controller: `${__filename}:getUserInfoRoute`,
    },
  }));
};

controllerRouter.use(authorizationHeader);

/** @path /users/logout */
controllerRouter.post('/', logoutRoute);

// create and export default register controller function
const registerClientConfigController = registerControllerGenerator(controllerRouter);
export default registerClientConfigController;
