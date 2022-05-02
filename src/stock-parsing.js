//stock-parsing.js
const fs = require("fs");
const path = require("path");

const data = require("/Users/soejun/Development/stock-analyzer/src/wsb_comment.json");
const nyse = require("/Users/soejun/Development/stock-analyzer/src/nyse_tickers.json")

const posts_length = Object.keys(data).length;
let amzn_count = 0;

/*  for (let j = 0; j < posts_length; j++) {
  let comments = data[j];
  let comments_length = Object.keys(data[j]).length;
  for (let i = 0; i < comments_length; i++) {
    let comment = comments[i];
    if (comment.includes("AAPL")) {
      console.log(comment);
      amzn_count++;
    }
  }
}  */




console.log(nyse);
