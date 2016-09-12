const request = require('request');

const authToken = process.env.authToken;

/**
 * returnIndex() returns the matches found
 * back to Code2040's API
 */
function returnMatches(arr) {
  request.post({
    uri: 'http://challenge.code2040.org/api/prefix/validate',
    method: 'POST',
    json: { token: authToken, array: arr } },
    (err, response, body) => {
      if (!err && response.statusCode === 200) {
        console.log(body);
      }
    });
}

/**
 * findInArray() returns an array of strings ("matches")
 * that do not have the inputed prefix
 */
function findInArray(prefix, array) {
  const matches = [];
  for (let string of array) {
    if (!string.startsWith(prefix)) matches.push(string);
  }
  returnMatches(matches);
}


/**
 * Fetches the prefix and the array from Code2040
 * passes the objects to findInArray()
 */
request.post({
  uri: 'http://challenge.code2040.org/api/prefix',
  method: 'POST',
  json: { token: authToken } },
  (err, response, body) => {
    if (!err && response.statusCode === 200) {
      findInArray(body.prefix, body.array);
    }
  });
