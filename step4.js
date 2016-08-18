const request = require('request');

const authToken = '<authToken>';

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

function findInArray(prefix, array) {
  const matches = [];
  for (let string of array) {
    if (!string.startsWith(prefix)) matches.push(string);
  }
  returnMatches(matches);
}


request.post({
  uri: 'http://challenge.code2040.org/api/prefix',
  method: 'POST',
  json: { token: authToken } },
  (err, response, body) => {
    if (!err && response.statusCode === 200) {
      findInArray(body.prefix, body.array);
    }
  });
