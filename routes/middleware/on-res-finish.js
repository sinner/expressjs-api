import auditLogger from '../../util/audit-logger';

// This is to register functions to run when the response is sent
// Express wraps the node http.ServerResponse https://nodejs.org/api/http.html#http_event_finish
// res.on('finish', functionToRun)
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const onResFinish = (req, res, next) => {
  res.on('finish', () => {
    auditLogger.logClientResponse(`Response to "${req.originalUrl}" ${req.method} Request has finished with ${res.statusCode} HTTP`);
  });
  next();
};

export default onResFinish;
