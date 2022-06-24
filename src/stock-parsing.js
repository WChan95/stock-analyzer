//stock-parsing.js

const stopwords = require("/Users/soejun/Development/stock-analyzer/src/stopwords.js");
const data = require("/Users/soejun/Development/stock-analyzer/src/wsb_comments.json");
const nyse = require("/Users/soejun/Development/stock-analyzer/src/nyse_tickers.json");
const num_tickers = Object.keys(nyse).length;
const posts_length = Object.keys(data).length;

function remove_stopwords(str) {
  res = [];
  words = str.split(" ");
  for (i = 0; i < words.length; i++) {
    word_clean = words[i].split(".").join("");
    if (!stopwords.Array.includes(word_clean.toLowerCase())) {
      res.push(word_clean);
    }
  }
  return res.join(" ");
}

const cleaned_comments = [];
const parsed_stocks = [];

for (let j = 0; j < posts_length; j++) {
  let comments = data[j];
  let comments_length = Object.keys(data[j]).length;
  for (let i = 0; i < comments_length; i++) {
    let comment = comments[i];
    cleaned_comments.push(remove_stopwords(comment));
  }
}

for (let i = 0; i < cleaned_comments.length; i++) {
  const regEx = new RegExp("[A-Zs]+");
  comment = cleaned_comments[i];
  let stock_tick = { ticker: "", count: 0 };
  let potential_stock = comment.match(regEx);
  if (potential_stock !== null && !parsed_stocks.includes(potential_stock[0])) {
    /* stock_tick["ticker"] = potential_stock[0]; */
    parsed_stocks.push(potential_stock[0]);
  }
}
for (let i = 0; i < parsed_stocks.length; i++) {
  let ticker = parsed_stocks[i];
  let stock = { ticker: ticker, count: 0 };
  parsed_stocks[i] = stock;
  
}

console.log(parsed_stocks)
