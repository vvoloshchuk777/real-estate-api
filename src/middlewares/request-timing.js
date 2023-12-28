export const requestTiming = (req, res, next) => {
  // skip logs for graphql playground schema requests
  if (req.body.operationName === 'IntrospectionQuery') {
    next();
  } else {
    const startHrTime = process.hrtime();

    res.on('finish', () => {
      const [seconds, nanoseconds] = process.hrtime(startHrTime);
      const ms = seconds * 1000 + nanoseconds / 1e6;
      console.log(`request to ${req.originalUrl} took ${ms}ms`);
    });

    next();
  }
};
