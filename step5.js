const request = require('request');

const authToken = process.env.authToken;

function returnTime(timeString) {
  request.post({
    uri: 'http://challenge.code2040.org/api/dating/validate',
    method: 'POST',
    json: { token: authToken, datestamp: timeString } },
    (err, response, body) => {
      if (!err && response.statusCode === 200) {
        console.log(body);
      }
    });
}

request.post({
  uri: 'http://challenge.code2040.org/api/dating',
  method: 'POST',
  json: { token: authToken } },
  (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const parsedTime = new Date(body.datestamp).getTime();
      const finalTime = parsedTime + (body.interval * 1000);
      returnTime(new Date(finalTime).toISOString().split('.')[0] + 'Z');
    }
  });
