const request = require('request');

const authToken = process.env.authToken;

/**
 * reverse() returns a new string reversed
 * based on the passed-in string
 */
function reverse(str) {
  return str.split('').reverse().join('');
}

/**
 * returnString() sends the reversed string
 * back to Code2040's API
 */
function returnString(str) {
  request.post({
    uri: 'http://challenge.code2040.org/api/reverse/validate',
    method: 'POST',
    json: { token: authToken, string: str } },
    (err, response, body) => {
      if (!err && response.statusCode === 200) {
        console.log(body);
      }
    });
}

/**
 * Fetches the string to be reversed from Code2040
 * passes the string to reverse() then to returnString()
 */
request.post({
  uri: 'http://challenge.code2040.org/api/reverse',
  method: 'POST',
  json: { token: authToken } },
  (err, response, body) => {
    if (!err && response.statusCode === 200) {
      returnString(reverse(body));
    }
  });
