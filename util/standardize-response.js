import generalConfig from '../properties/config';

export default (payload = {}) => {
  const DataSymbol = Symbol('data');
  const StatusSymbol = Symbol('status');
  const ErrorSymbol = Symbol('error');
  const MessageSymbol = Symbol('message');
  const ConfigSymbol = Symbol('config');

  class ApiResponse {
    constructor(rawResponse) {
      this.rawResponse = rawResponse;
      this.data = rawResponse.data || null;
      this.result = rawResponse.result || rawResponse.data || undefined;
      this.status = rawResponse.status || {
        statusCode: 500,
        success: false,
      };
      this.error = rawResponse.error || undefined;
      this.message = rawResponse.message || 'Ok';
      this.config = rawResponse.config || undefined;
    }

    get data() {
      return this[DataSymbol];
    }

    set data(data) {
      this[DataSymbol] = data;
    }

    get config() {
      return this[ConfigSymbol];
    }

    set config(config) {
      const finalConfig = {
        ...config,
        env: {
          appVersion: process.env.version,
          nodeVersion: process.env.node_version,
          environment: process.env.NODE_ENV || 'dev',
        },
      };
      this[ConfigSymbol] = process.env.NODE_ENV !== 'prod' ? finalConfig : undefined;
    }

    get status() {
      return this[StatusSymbol];
    }

    set status(status) {
      this[StatusSymbol] = status;
    }

    get error() {
      return this[ErrorSymbol];
    }

    set error(error) {
      this[ErrorSymbol] = error;
    }

    get message() {
      return this[MessageSymbol];
    }

    set message(message) {
      if (typeof message !== 'string') throw new Error('Message must be a string');
      this[MessageSymbol] = message;
    }

    toJSON() {
      return {
        ...this.rawResponse,
        data: this.data || undefined,
        status: this.status,
        error: this.error,
        message: this.message,
        config: this.config,
        time: (new Date()).toISOString(),
        version: generalConfig.get('app:version'),
      };
    }
  }

  return new ApiResponse(payload);
};
