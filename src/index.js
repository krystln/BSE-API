const express = require('express');
const app = express();

const { exec } = require('child_process');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {

  const output = (error, stdout) => {
    if (error) {
      console.log(error);
    } else {
      console.log(stdout);
    }
  }
  const url = "https://www.microsoft.com/en-us/software-download/windows10ISO";
  exec('./src/scripts/download.ps1 ' + url + ' test ' + '\n./src/scripts/extract.ps1\n echo "Listening on Port 3000"',
    { "shell": "powershell.exe" },
    output
  );
});