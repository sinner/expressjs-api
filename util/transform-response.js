export const transformResponseData = (responsePromise) => {
  // transform data and send forward
  const transformDataPromise = responsePromise.then((response) => {
    const { status, data, config = {} } = response;
    return {
      status,
      config,
      data,
    };
  }).catch((error) => {
    const { response = {} } = error;
    const defaultErrorStatus = {
      statusCode: 500,
      success: false,
    };
    const { status = defaultErrorStatus, data, config = {} } = response;
    return {
      status,
      message: 'Internal Server Error',
      config,
      error: {
        name: error.name,
        message: error.message,
        description: error.toString(),
        trace: error.stack,
        isAxiosError: error.isAxiosError,
      },
      data,
    };
  });

  return transformDataPromise;
};
