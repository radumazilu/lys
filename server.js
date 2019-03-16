#!/usr/bin/env node

const express = require('express');
let {PythonShell} = require('python-shell');

const app = express();
const port = process.env.PORT || 5000;

//Static file declaration
// app.use(express.static(path.join(__dirname, 'client/build')));

// //production mode
// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   //
//   app.get('*', (req, res) => {
//     res.sendfile(path.join(__dirname = 'client/build/index.html'));
//   })
// }
//
// //build mode
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/public/index.html'));
// })

app.get('/app/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/app/scrape', scrapeContent);

function scrapeContent(req, res) {
  console.log('Scraping the content...');
  const options = {
    args:
    [
      req.query.link // link to scrape
    ],
    // pythonPath: '/Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6' // path for python3
  }
  PythonShell.run('./scraper.py', options, function (err, data) {
    if (err) {
      console.log('returning an error');
      res.send(err);
    }
    console.log('Data is:');
    console.log(data);
    res.send({ express: data })
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
