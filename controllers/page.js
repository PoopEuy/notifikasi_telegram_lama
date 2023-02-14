import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";
dotenv.config();

const token_bot = process.env.BOT_TOKEN;
const bot = new Telegraf(token_bot);

// Home page
export const Home = (req, res) => {
  res.send("Welcome to Home Page");
};

// About Page
export const About = (req, res) => {
  res.send("Welcome to About Page");
};

// Contact page
export const Contact = (req, res) => {
  res.send("Welcome to Contact Page");
};

// Contact page
export const botStart = (req, res) => {
  bot.command("start", (ctx) => {
    console.log(ctx.from);
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Hello there! Welcome to the Code Capsules telegram bot.\nI respond to /ethereum. Please try it",
      {}
    );
  });

  //   res.send("Welcome to Contact Page");
};
