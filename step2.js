const request = require('request');

const authToken = '<authToken>';

function reverse(str) {
  return str.split('').reverse().join('');
}

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

request.post({
  uri: 'http://challenge.code2040.org/api/reverse',
  method: 'POST',
  json: { token: authToken } },
  (err, response, body) => {
    if (!err && response.statusCode === 200) {
      returnString(reverse(body));
    }
  });
