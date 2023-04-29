const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const newFeed = JSON.parse(event.body);
  const feedsFilePath = path.join(__dirname, '..', 'src', 'data', 'feeds.json');
  const feeds = JSON.parse(fs.readFileSync(feedsFilePath, 'utf-8'));

  feeds.push(newFeed);
  fs.writeFileSync(feedsFilePath, JSON.stringify(feeds, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Feed added successfully' }),
  };
};
