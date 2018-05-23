const express = require('express');
const PythonShell = require('python-shell');

const app = express();
const port = process.env.PORT || 5000;

app.get('/app/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/app/scrape', scrapeContent);

function scrapeContent(req, res) {
  const options = {
    args:
    [
      req.query.link // link to scrape
    ],
    pythonPath: '/Library/Frameworks/Python.framework/Versions/3.5/bin/python3' // path for python3
  }
  PythonShell.run('./scraper.py', options, function (err, data) {
    if (err) res.send(err);
    res.send({ express: data })
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
