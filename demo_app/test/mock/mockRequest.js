'use strict';

/**
 * Mocks the request() function from the npm `request` module
 * @see https://www.npmjs.org/package/request
 */
module.exports = (function () {
  var requests = [];

  /**
   * @method request
   * @param {string} url
   * @param {function} handler - callback function to handle response
   */
  function request(url, handler) {
    requests.unshift({
      url: url,
      responseHandlerFn: handler,
      response: null,

      /**
       * @method respond
       * @param {number} statusCode
       * @param {object} headers
       * @param {string} body
       */
      respond: function (statusCode, headers, body) {
        if (this.response !== null) {
          throw Error('Response already sent');
        }

        this.response = {
          statusCode: statusCode,
          headers: headers,
          body: body
        };

        handler(null, this.response, this.response.body);
      }
    });
  }

  /**
   * @method reset
   */
  function reset() {
    requests.length = 0;
  }

  return {
    request  : request,
    requests : requests,
    reset    : reset
  };
}());
