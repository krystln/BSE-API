const express = require('express');
const app = express();

const fs = require('fs');
const { exec } = require('child_process');
const { parse } = require('csv-parse');

const { favourites_get, favourites_post, favourites_delete } = require('./favourites');
const { stock_get, stock_post, stock_delete, stock_post_csv } = require('./stock');


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
  exec('./src/scripts/download.ps1 ' + url + ' test ' +
    '\n./src/scripts/extract.ps1',
    { "shell": "powershell.exe" },
    output
  );


});


// Output the result of the script
const output = async (err, stdout, stderr) => {
  if (err || stderr) {
    console.log(stderr);
    process.exit(1);
  } else {
    console.log(stdout);

    console.log("Parsing file...");
    try {
      const file_name = `./downloads/EQ${file}.CSV`;
      let data = [];

      const reader = fs.createReadStream(file_name, 'utf8')
        .pipe(
          parse({
            delimiter: ',',
            columns: true,
            trim: true,
            bom: true
          })
        );

      for await (const row of reader) {
        data.push({
          code: row.SC_CODE,
          name: row.SC_NAME,
          open: parseFloat(row.OPEN),
          high: parseFloat(row.HIGH),
          low: parseFloat(row.LOW),
          close: parseFloat(row.CLOSE)
        });
      }

      console.log("File Parsing complete\nUploading data...");
      await stock_post_csv(data);
      console.log("Data uploaded successfully\nListening on port 3000 : http://localhost:3000");

    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}