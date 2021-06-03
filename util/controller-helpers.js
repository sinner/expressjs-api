export const registerControllerGenerator = (controllerRouter) => {
  const registerController = ({ router, path }) => {
    router.use(path, controllerRouter);
  };
  return registerController;
};
