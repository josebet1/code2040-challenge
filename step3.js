const request = require('request');

const authToken = process.env.authToken;

function returnIndex(index) {
  request.post({
    uri: 'http://challenge.code2040.org/api/haystack/validate',
    method: 'POST',
    json: { token: authToken, needle: index } },
    (err, response, body) => {
      if (!err && response.statusCode === 200) {
        console.log(body);
      }
    });
}

function findIndex(needle, haystack) {
  const len = haystack.length;
  let index;
  for (let i = 0; i < len; i++) {
    if (haystack[i] === needle) index = i;
  }
  if (index) {
    returnIndex(index);
  } else {
    console.error('Error: needle not found in haystack.');
  }
}

request.post({
  uri: 'http://challenge.code2040.org/api/haystack',
  method: 'POST',
  json: { token: authToken } },
  (err, response, body) => {
    if (!err && response.statusCode === 200) {
      findIndex(body.needle, body.haystack);
    }
  });
