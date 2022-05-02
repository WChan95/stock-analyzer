//stock-parsing.js
const fs = require("fs");
const path = require("path");

const data = require("/Users/soejun/Development/stock-analyzer/src/wsb_comments.json");
const nyse = require("/Users/soejun/Development/stock-analyzer/src/nyse_tickers.json");
const num_tickers = Object.keys(nyse).length;

const posts_length = Object.keys(data).length;

/*Initializes nyse ticker list as object*/
/*If a ticker has 0 counts, ticker will not be shown*/
let stocks = [];
for (let k = 0; k < num_tickers; k++) {
  let ticker = { ticker: nyse[k], mentioned: 0 };
  stocks.push(ticker);
}

for (let j = 0; j < posts_length; j++) {
  let comments = data[j];
  let comments_length = Object.keys(data[j]).length;
  for (let i = 0; i < comments_length; i++) {
    let comment = comments[i];
    for (let k = 0; k < num_tickers; k++) {
      if (comment.includes(stocks[k].ticker)) {
        stocks[k].mentioned++;
      }
    }
  }
}

for(let i = 0; i < stocks.length; i++){
    if(stocks[i].mentioned > 0){
        console.log(stocks[i])
    }
}

//what we need to do next is check if a substring of this comment matches any of the tickers in NYSE
//if mentioned, create an object w/ that count
