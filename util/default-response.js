import defaultResponse from '../mocked-data/default.json';
import standardResponse from '../util/standardize-response';

export const successResponse = (data, config = undefined) => {
  return standardResponse({
    ...defaultResponse.success,
    data,
    config,
  });
};
