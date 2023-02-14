//import
import express from "express";
import * as dotenv from "dotenv";
import Router from "./routes/routes.js";
import axios from "axios";
import cors from "cors";
dotenv.config();
const app = express();
import { Telegraf } from "telegraf";
import * as cron from "node-cron";

const token_bot = process.env.BOT_TOKEN;
const CHAT_ID = process.env.BOT_GROUP_CHAT_ID;
const bot = new Telegraf(token_bot);
var array_message = [];
let date_ob;
let waktu;
let d;
let h;
let m;

console.log("token_bot : " + token_bot);

//env use

const PORT = process.env.PORT;

console.log("PORT : " + PORT);
// Use Router
app.use(Router);

app.use(express.static("static"));
app.use(express.json());
app.use(cors());

// listen on port
app.listen(PORT, async function () {
  try {
    console.log("Connection has been established successfully.");
    setTimeout(
      await function () {
        cron_filter();
      },
      500
    );

    return console.log(`Server Berjalan pada 1port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/index.html"));
// });

bot.launch();

bot.command("start", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Hello there! Welcome to the Code Capsules telegram bot.\nI respond to /ethereum. Please try it",
    {}
  );
});

bot.command("sitedown", (ctx) => {
  getSiteDown();
});

async function cron_filter() {
  console.log("masuk cron ilter");
  // 00, 10, 20, 30, 40, 50;
  // await cron.schedule("* 09 * * * *", () => {
  //   date_ob = new Date();
  //   console.log("running a task ");
  //   // getSiteDown();
  // });

  await cron.schedule("00 00,10,20,30,40,50 * * * *", () => {
    date_ob = new Date();
    console.log("running a task pada setiap jam 0,6,12,18");
    getSiteDown();
  });
}

async function getRealtime() {
  console.log("masuk fungsi");

  try {
    let total_down = 0;

    const res = await axios.get(`http://localhost:3001/getRealtime`);
    const arr = await res.data;

    const batt_volt = await res.data[0].batt_volt;
    const jmlah_data = arr.length;
    const array = await res.data;

    // console.log("jumnlah data  : " + jmlah_data);
    // console.log("recived batt_volt: " + batt_volt);
    for (let i = 0; i < array.length; i++) {
      const site_name = await array[i].site_name;
      const site_message = await array[i].message;
      const site_downtime = await array[i].downtime;
      const site_downdate = await array[i].created_at;

      if (site_downtime > 10) {
        total_down = total_down + 1;

        setTimeout(
          await function () {
            autoChat(site_name, total_down, site_downtime, site_downdate);
          },
          5000
        );
      } else {
      }
    }
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

async function getSiteDown() {
  console.log("masuk fungsi");

  try {
    const res = await axios.get(`http://localhost:3001/getSiteDown`);
    const arr = await res.data;

    const total_down = arr.length;
    const array = await res.data;

    console.log("total_down data  : " + total_down);

    if (total_down > 0) {
      for (let i = 0; i < array.length; i++) {
        const site_name = await array[i].site_name;
        const site_message = await array[i].message;
        const site_downtime = await array[i].downtime;
        const site_downdate = await array[i].created_at;

        ConvertMinutes(
          site_name,
          total_down,
          site_downtime,
          site_downdate,
          site_message
        );
      }
    } else {
      console.log("TIDAK ADA SERVER DOWN");
    }
  } catch (error) {
    console.error(error);
    console.log("error");
  }
}

// bot.command("ethereum", (ctx) => {
//   var rate;
//   console.log(ctx.from);
//   axios
//     .get(
//       `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
//     )
//     .then((response) => {
//       console.log(response.data);
//       rate = response.data.ethereum;
//       const message = `Hello, today the ethereum price is ${rate.usd}USD`;
//       bot.telegram.sendMessage(ctx.chat.id, message, {});
//     });
// });

async function ConvertMinutes(
  site_name,
  total_down,
  site_downtime,
  site_downdate,
  site_message
) {
  d = Math.floor(site_downtime / 1440); // 60*24
  h = Math.floor((site_downtime - d * 1440) / 60);
  m = Math.round(site_downtime % 60);
  // console.log("site_downtime = " + site_downtime);
  // console.log("d = " + d);
  // console.log("h = " + h);
  // console.log("m = " + m);
  if (d > 0) {
    // return d + " days, " + h + " hours, " + m + " minutes";
    waktu = d + " days, " + h + " hours, " + m + " minutes";
    console.log("site : " + site_name + ", waktu : " + waktu);
    autoChat(site_name, total_down, waktu, site_downdate, site_message);
  } else {
    // return h + " hours, " + m + " minutes";
    waktu = h + " hours, " + m + " minutes";
    console.log("site : " + site_name + ", waktu : " + waktu);
    autoChat(site_name, total_down, waktu, site_downdate, site_message);
  }
}

const autoChat = async (
  site_name,
  total_down,
  waktu,
  site_downdate,
  site_message
) => {
  const msg_siteName = site_name;
  const msg_totalDown = total_down;
  const msg_downDuration = waktu;
  const tanggal_down = new Date(site_downdate);
  const msg_downDate = tanggal_down;
  const string = `<b>ALERT!!! SITE DOWN!!!</b> \n Site Name : ${msg_siteName} \n Down Date : ${msg_downDate} \n Down Duration : ${msg_downDuration} Min \n Reason : ${site_message} \n\n`;
  // console.log("message = " + message);

  array_message.push(string);
  let total_chat = array_message.length;

  console.log("total_chat : " + total_chat);
  const join_arr = array_message.join("");
  const array_str = join_arr.toString();
  const message = array_str;
  const message_total = `TOTAL SITE DOWM : ${total_down} `;

  if (total_chat == total_down) {
    bot.telegram.sendMessage(CHAT_ID, message, { parse_mode: "HTML" });
    setTimeout(
      await function () {
        bot.telegram.sendMessage(CHAT_ID, message_total, {
          parse_mode: "HTML",
        });
      },
      1500
    );

    console.log("KIRIM CHAT!!! : ");
    array_message = [];
    console.log("ARRAY CLEAR : " + array_message);
    total_chat = array_message.length;
    console.log("ARRAY CLEAR rANGE: " + total_chat);
  } else {
    console.log("TIDAK KIRIM CHAT!!! " + site_name);
  }
};
