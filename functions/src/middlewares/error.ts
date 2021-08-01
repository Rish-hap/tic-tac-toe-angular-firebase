const errorHandler = (err:any, req:any, res:any, next:any) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode || 500,
    success:false,
    message
  }

  res.status(statusCode || 500).send(response);
};

export {
  errorHandler
};