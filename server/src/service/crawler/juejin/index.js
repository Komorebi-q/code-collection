const fs = require("fs");
const puppeteer = require("puppeteer");
const mongo = require("mongodb").MongoClient;
const dbConf = require("./../../../config/db");
const chalk = require("chalk");
const commonConf = require("../../../config/crawler");
const { renderProgressBar } = require("../../../util/crawler/progress");
const conf = {
  path: "https://juejin.im/welcome/frontend?sort=popular",
  like: 150,
  comment: 50
};

exports.crawlerJueJinFe = async () => {
  const browser = await puppeteer.launch();

  console.log(chalk.green("start..."));

  try {
    const page = await browser.newPage();
    page.on("console", msg => {
      if (typeof msg === "object") {
        console.dir(msg);
      } else {
        console.log(msg);
      }
    });

    await page.goto(conf.path);
    console.log(chalk.green(`load page ${conf.path}`));
    await page.waitFor(2000);

    async function scrollPage() {
      await page.$eval("body", el => {
        let curHeight, goHeight, scrollHeight;

        curHeight = el.offsetHeight;
        goHeight = curHeight * 0.9;
        scrollHeight = (curHeight * 0.1) / 10;

        window.scrollTo(0, goHeight);
        // 滑动十次到底部
        for (let i = 1; i < 11; i++) {
          goHeight += i * scrollHeight;
          window.scrollTo(0, goHeight);
        }
      });
    }

    for (let i = 0; i < 10; i++) {
      await scrollPage();
      renderProgressBar(i + 1, 10);
      await page.waitFor(1500);
    }

    let list = await page.$$eval(
      ".entry-list .item",
      (lists, conf) => {
        const res = [];

        for (const l of lists) {
          const likeDom = l.querySelector(".like .count");
          const commentDom = l.querySelector(".comment .count");
          const urlDom = l.querySelector(".entry-link");
          const titleDom = l.querySelector(".title");
          const descDom = l.querySelector(".entry-link");
          const authorDom = l.querySelector(".username");
          const tagDom = l.querySelector(".tag");
          const like = ~~(likeDom && likeDom.innerHTML) || 0;
          const comment = ~~(commentDom && commentDom.innerHTML) || 0;

          const target = {
            url: `https://juejin.im${(urlDom && urlDom.getAttribute("href")) ||
              ""}`,
            title: (titleDom && titleDom.innerText) || "",
            description: (descDom && descDom.innerText) || "",
            date: new Date(),
            author: (authorDom && authorDom.innerText) || "",
            tag: (tagDom && tagDom.innerText) || "",
            like,
            comment,
            from: "juejin"
          };

          if (target.title && (like >= conf.like || comment >= conf.comment)) {
            res.push(target);
          }
        }

        return res;
      },
      conf
    );

    const client = await mongo.connect(`mongodb://localhost:27017/`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = await client.db("komorebi");
    const collection = await db.collection("posts");
    const postRes = [];

    for (const l of list) {
      const exist = await collection.find({ title: l.title }).count();
      if (!exist) {
        postRes.push(l);
      }
    }

    if (postRes.length) {
      await collection.insertMany(postRes);
    }

    // await fs.writeFileSync(
    //   "./jujin.json",
    //   JSON.stringify(postRes, undefined, 2)
    // );

    console.log(chalk.green("saved db..."));

    process.exit(1);
  } catch (err) {
    throw err;
  }
};

exports.crawlerJueJinFe();
