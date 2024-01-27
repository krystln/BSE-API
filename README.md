# BSE API

This API has been created as an assignment for the interview process at [Hypergro](https://hypergro.ai/). This API fetches the data from [BSE India](https://www.bseindia.com/) and provides the data in JSON format. The code is written in Node.js and Express.js and uses MongoDB as the database with Prisma as the ORM.

**YES I KNOW, .env files shouldn't be included. This db url will be removed and db deleted in a weeks time, i.e. 03-FEB-2024**

The scripts are written for powershell.exe on windows and most probably won't work on linux. The scripts are written to be run in the root directory of the project.

## Requirements

Express\
Prisma\
csv-parse\

## Installation

Clone the repository and install the dependencies:\
`npm install`

Run the server with the following command:\
`node src/index.js <DDMMYY>`\
Enter date in DDMMYY format to get the data for that date. If no date is entered, the data will not be fetched.

## Usage

At server runtime, the ps1 scripts would download the data from the BSE site for mentioned date. If the data for the requested date is not present on the website then an error is thrown.\
**Any error would prevent the server from starting as a safety measure!!**\
The data is then extracted, parsed and stored in the database. The data is then available for use. Please remember to delete all data from the database before running the server again for the same date as data duplication **will** throws error.

### Stocks

To get the list of first 10 stocks sorted by their name:\
GET : `http://localhost:3000/stocks`

To get specific stock details :\
GET : `http://localhost:3000/stocks?name=<stock_name>`

To delete a stock from the list:\
DELETE : `http://localhost:3000/stocks?name=<stock_name>`\
DELETE : `http://localhost:3000/stocks?code=<stock_code>`\
DELETE : `http://localhost:3000/stocks?code=<stock_code>&name=<stock_name>`

To delete all stocks from the list:\
DELETE : `http://localhost:3000/stocks`

### Favorites

To get the list of favorite stocks:\
GET : `http://localhost:3000/favorites`

To add a stock to favorites:\
POST : `http://localhost:3000/favorites?name=<stock_name>&code=<stock_code>`

To delete a stock from favorites:\
DELETE : `http://localhost:3000/favorites?code=<stock_code>`
