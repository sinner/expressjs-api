import express from 'express';
import { registerControllerGenerator } from '../../../util/controller-helpers';
import standardResponse from '../../../util/standardize-response';

// create router
export const controllerRouter = express.Router();

// define and export middleware
export const getHealthRoute = (req, res) => {
  res.status(200).json({
    status: {
      statusCode: 200,
      success: true,
    },
    message: 'Ok',
  });
};

// register middleware
controllerRouter.get('/', getHealthRoute);

// create and export default register controller function
const registerClientConfigController = registerControllerGenerator(controllerRouter);
export default registerClientConfigController;
