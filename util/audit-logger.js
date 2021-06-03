/* eslint-disable no-continue */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable class-methods-use-this */
import { isUndefined, pick, snakeCase } from 'lodash';
import Logger from './logger';

export const logger = Logger.getLogger('__filename');

export class AuditLogger {
  logApiResponse(responseLogObject) {
    logger.audit(this._formatLog(responseLogObject));
  }

  logClientResponse(res) {
    logger.audit(this._formatResponseLog(res));
  }

  _formatLog(responseLogObject) {
    return this._createLogString(this._snakeCaseObjectKeys(responseLogObject));
  }

  _formatResponseLog(res) {
    if (typeof res === 'string') return res;
    if (!res || !res.locals || !res.locals.reqMetaData) return 'INVALID FORMAT FOR LOG';
    const { reqMetaData } = res.locals;
    // get log data from req.reqMetaData (same as res.locals.reqMetaData)
    const genericLogData = this._getGenericLogData(reqMetaData);
    const endTime = Date.now();
    const { startTime = 0 } = genericLogData;
    const executeTime = endTime - startTime;
    const eventDescription = 'response to client request';
    const eventSeverity = 'info';
    const eventStatus = 'success';
    const eventType = 'response';
    const outgoingRequests = this._getOutgoingRequestIds(reqMetaData.outgoingRequests || []);
    const requestSpecificLogData = {
      eventDescription,
      eventSeverity,
      eventStatus,
      eventType,
      endTime,
      executeTime,
      outgoingRequests,
    };
    const logObject = { ...genericLogData, ...requestSpecificLogData };
    return this._formatLog(logObject);
  }

  // get properties to log from reqMetaData object set on locals and express req object
  _getGenericLogData(reqMetaData) {
    if (!reqMetaData) return {};
    const properties = [
      'clientIp', 'eventDescription', 'eventSeverity', 'eventStatus', 'eventType', 'method', 'path',
      'requestId', 'realUserId', 'serviceName', 'startTime', 'userId', 'headers',
    ];
    return pick(reqMetaData, properties);
  }

  _createLogString(object) {
    const timestamp = (new Date()).toString();
    let string = `${timestamp} `;
    for (const key in object) {
      const isValidKey = object.hasOwnProperty(key) && !isUndefined(object[key]);
      if (!isValidKey) continue;
      if (typeof object[key] !== 'object') {
        string += `${key}="${object[key]}" `;
      } else {
        string += `${key}="${JSON.stringify(object[key])}" `;
      }
    }
    return string.trim();
  }

  _snakeCaseObjectKeys(obj) {
    if (!obj || typeof obj !== 'object') return {};
    const snakeCaseObject = {};
    for (const key in obj) {
      snakeCaseObject[snakeCase(key)] = obj[key];
    }
    return snakeCaseObject;
  }

  _getOutgoingRequestIds(requestArr = []) { // create a string of outgoing request ids;
    return requestArr.map((requestData) => requestData.secondaryRequestId).join(',');
  }
}

const auditLogger = new AuditLogger();
export default auditLogger;
