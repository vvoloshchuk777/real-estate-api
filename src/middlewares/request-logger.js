export const requestLogger = (req, res, next) => {
  // skip logs for graphql playground schema requests
  if (req.body.operationName === 'IntrospectionQuery') {
    next();
  } else {
    const fullUrl = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
    const params = JSON.stringify(req.params);

    const message = `\nNew Request:
      Timestamp: ${new Date()}
      Method: ${req.method}
      Params: ${params}
      URL: ${fullUrl}`;

    if (['GET', 'DELETE', 'OPTIONS'].includes(req.method)) {
      console.log(`${message}
      Query: ${JSON.stringify(req.query)}`);
    } else {
      console.log(`${message}
      Body: ${JSON.stringify(req.body)}`);
    }
    next();
  }
};
