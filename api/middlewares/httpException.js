module.exports = function(req, res, err) {
  /* Set response status code */
  res.statusCode = err.statusCode;
  /* Define base response */
  var response = {
    status: err.statusCode
  };
  /* Verify additional info */
  if(err.message) {
    response.devMessage = err.message;
  }
  if (err.context) {
    if ('userMessage' in err.context) { response.userMessage = err.context.userMessage; }
    if ('errorCode' in err.context) { response.errorCode = err.context.errorCode; }
    if ('moreInfo' in err.context) { response.moreInfo = err.context.moreInfo; }
  }
  /* Response */
  res.send(response);
};
