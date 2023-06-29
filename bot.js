const { TOKEN, CHAT_ID } = require("./config");

const axios = require("axios");
const telegramBot = require("node-telegram-bot-api");

const { format } = require("date-fns");

const bot = new telegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  console.log(messageText);
  console.log(chatId);
  bot.sendMessage(chatId, "Hello! I'm your telegram bot.");
});

bot.onText(/\/init/, async (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);
  const message = msg.text;
});
async function getData() {
  const formattedDate = format(new Date(), "ddMMyyyy");
  console.log(formattedDate);

  const res = await fetch(
    `https://www.indumex.com/Umbraco/api/Pizarra/Cotizaciones?fecha=${formattedDate}`,
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua":
          '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
      },
      referrer: "https://www.indumex.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  );

  return res.json();
}
async function sendCotizaciones() {
  const data = await getData();
  const sell = data[0].Venta;

  bot.sendMessage(CHAT_ID, sell);
  console.log(sell);
}

sendCotizaciones();

setInterval(sendCotizaciones, 1000 * 60 * 10);
