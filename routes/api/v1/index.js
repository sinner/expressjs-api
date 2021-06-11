import express from 'express';
import registerHealthCheckController from './health-check-controller';
import registerLoginController from './login-controller';
import registerUserController from './user-controller';
import registerLogoutController from './logout-controller';
import registerPortfoliosController from './portfolio-controller';
import registerAlertsController from './alerts-controller';
import registerMultiPortfolioConfigController from './multi-portfolio-controller';

const versionOneRouter = express.Router();
registerHealthCheckController({ router: versionOneRouter, path: '/health' });
registerLoginController({ router: versionOneRouter, path: '/auth' });
registerUserController({ router: versionOneRouter, path: '/users' });
registerLogoutController({ router: versionOneRouter, path: '/logout' });
registerPortfoliosController({ router: versionOneRouter, path: '/portfolios' });
registerAlertsController({ router: versionOneRouter, path: '/alerts' });
registerMultiPortfolioConfigController({ router: versionOneRouter, path: '/multi-portfolio' });

export default versionOneRouter;
