const puppeteer = require("puppeteer");
const fs = require('fs');
const REDDIT_URL = (post_title) => `https://www.reddit.com/r/wallstreetbets/`;

(async () => {
  /* Initiate the Puppeteer browser */
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  /* Go to the IMDB Movie page and wait for it to load */
  await page.goto(REDDIT_URL(), { waitUntil: "networkidle0" });

  /* Run javascript inside of the page */
  let data = await page.evaluate(() => {
    let links = Array.from(
      document.querySelectorAll('[data-test-id="comments-page-link-num-comments"]')
    ).map((link) => {
      return link.href;
    });
    //going into post

    /* Returning an object filled with the scraped data */
    return {
      links,
    };
  });

  let comment_compilation = [];
  for (let i = 0; i < data.links.length; i++) {
    await page.goto(data.links[i], { waitUntil: "networkidle0" });
    let data_comments = await page.evaluate(() => {
      let comments = Array.from(document.querySelectorAll("p")).map((comment) => {
        return comment.innerText;
      });
      return { ...comments };
    });
    comment_compilation.push(data_comments);
  }

  const json_comments = JSON.stringify(comment_compilation,null,4);

  await browser.close();
  fs.writeFile('wsb_comments.json',json_comments,(err)=>{
    if(err){
      throw err;
    }
    console.log("JSON data is saved");
  })
})();
