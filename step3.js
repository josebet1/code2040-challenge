const request = require('request');

const authToken = '0921ec8f631a3a2078c18b9d3ba915ad';

function returnString(str) {
  request.post({
    uri: 'http://challenge.code2040.org/api/haystack/validate',
    method: 'POST',
    json: { token: authToken, string: str } },
    (err, response, body) => {
      if (!err && response.statusCode === 200) {
        console.log(body);
      }
    });
}

request.post({
  uri: 'http://challenge.code2040.org/api/haystack',
  method: 'POST',
  json: { token: authToken } },
  (err, response, body) => {
    if (!err && response.statusCode === 200) {
      console.log(body);
    }
  });
