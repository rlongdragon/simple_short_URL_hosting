const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const databasePath = path.join(__dirname, 'database', 'transport.json');

app.get('/setURL', (req, res) => { // setURL?transport=xxx&surl=xxx
  const shortUrl = req.query.surl;
  const transport = req.query.transport;

  if (!shortUrl || !transport) {
    return res.status(400).send('Incomplete parameters');
  }

  // add short URL to the database
  const database = JSON.parse(fs.readFileSync(databasePath, 'utf-8'));
  if (database.hasOwnProperty(shortUrl)) {
    return res.status(409).send('Short URL already exists');
  }

  database[shortUrl] = { link: transport , count: 0};
  fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));

  res.send(`New transport added to ${shortUrl}`);
});

// Handling short URL redirects
app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  console.log("visited: ", shortUrl, "at ", new Date().toLocaleString());

  // Find the original URL corresponding to the short URL from the database
  const database = JSON.parse(fs.readFileSync(databasePath, 'utf-8'));

  if (database[shortUrl]) {
    const originalUrl = database[shortUrl].link;
    database[shortUrl].count += 1;
    fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
    return res.redirect(originalUrl);
  } else {
    return res.status(404).send('Short URL does not exist');
  }
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
}); 
