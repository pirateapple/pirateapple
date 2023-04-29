const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const feedsFilePath = path.join(__dirname, '..', 'src', 'data', 'feeds.json');
  const feeds = JSON.parse(fs.readFileSync(feedsFilePath, 'utf-8'));

  return {
    statusCode: 200,
    body: JSON.stringify(feeds),
  };
};
