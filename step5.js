const request = require('request');

const authToken = process.env.authToken;

/**
 * returnTime() returns the new time
 * back to Code2040's API
 */
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

/**
 * Fetches the time and the seconds to add from Code2040
 * It parses the time using new Date(), then it converts
 * the interval to milisconds and adds it.
 *
 * Note: Code2040 doesn't expect ECMA-262 spec of ISO String
 * so I had to change it up a bit to match their spec.
 */
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
