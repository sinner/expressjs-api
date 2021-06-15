import express from 'express';
import get from 'lodash/get';
import config from '../../../properties/config';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import standardResponse from '../../../util/standardize-response';
import { authenticationHeader } from '../../middleware/authentication-headers';
import AuthenticationManager from '../../../managers/authentication-manager';

export const controllerRouter = express.Router();

/**
 * Login user
 *
 * @param {*} req
 * @param {*} res
 */
export const loginRoute = async (req, res) => {
  const username = req.body[config.get('app:AUTH_USERNAME_LABEL')];
  const password = req.body[config.get('app:AUTH_PASSWORD_LABEL')];

  const authResponse = await AuthenticationManager.login({
    username,
    password,
  });

  res.status(get(authResponse, 'status.statusCode', 500)).json(standardResponse({
    ...authResponse,
    config: {
      ...authResponse.config,
      filename: __filename,
      controller: `${__filename}:loginRoute`,
    },
  }));
};

controllerRouter.use(authenticationHeader);

/** @path /auth/sso */
controllerRouter.post('/login', loginRoute);

// create and export default register controller function
const registerClientConfigController = registerControllerGenerator(controllerRouter);
export default registerClientConfigController;
