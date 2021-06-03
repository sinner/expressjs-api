import versionOneRoutes from './api/v1';
import middleware from './middleware';

export default function (router) {
  // ***** initial custom middleware *****

  //  ***** custom middleware *****
  router.use(middleware.securityHeaders); // validate security headers
  router.use(middleware.testHttpErrorsHeader); // test http errors header
  router.use(middleware.logging); // logging middleware
  router.use(middleware.onResFinish); // logging middleware

  //  ***** v1 routes  *****
  router.use('/api/v1', versionOneRoutes);

  // Handling 404 errors
  router.use(middleware.fourOhFourRoutes);
  // root error handler
  router.use(middleware.catchallError);
}
