const express = require('express');
const app = express();

const { exec } = require('child_process');

const { favourites_get, favourites_post, favourites_delete } = require('./favourites');
const { stock_get, stock_post, stock_delete } = require('./stock');


app.get('/', (req, res) => {
  res.send('Hi, Welcome to the BSE Stock API');
});

// stock_get, stock_delete is a function that is exported from stock.js
app.route('/stocks')
  .get(stock_get)
  .post(stock_post)
  .delete(stock_delete);

// favourites_get, favourites_post, and favourites_delete are functions that are exported from favourites.js
app.route('/favourites')
  .get(favourites_get)
  .post(favourites_post)
  .delete(favourites_delete);


const file = process.argv[2];
if (!file) {
  console.log('Please specify the date of file to work with\nnode src/index.js <DDMMYYYY>');
  process.exit(1);
}


// Start the server
app.listen(3000, async () => {
  const url = `https://www.bseindia.com/download/BhavCopy/Equity/EQ${file}_CSV.ZIP`;
  await exec('./src/scripts/download.ps1 ' + url + ' test ' + '\n./src/scripts/extract.ps1\n echo "Listening on Port 3000"',
    { "shell": "powershell.exe" },
    output
  );
});


// Output the result of the script
const output = (error, stdout) => {
  if (error) {
    console.log(error);
    process.exit(1);
  } else {
    console.log(stdout);
  }
}