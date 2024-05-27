import { } from 'dotenv/config'
import pkg from "node-telegram-bot-api";
import { getData } from './middleware.mjs'

const data = await getData();

console.log(data)
const bot = new pkg(process.env.x, { polling: true });


const inlineKeyboardForStart = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Cotizaciones ', callback_data: 'rates' },
      ]
    ]
  }
};
const inlineKeyboardForRates = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'Dolar', callback_data: 'USD' },
      { text: 'Real', callback_data: 'BR' }
      ], [{ text: 'Euro', callback_data: 'EU' }]
    ]
  }
}

bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const action = callbackQuery.data;
  if (action === "rates") {
    bot.sendMessage(message.chat.id, "🇺🇾 Estas son las opciones preferidas por el Uruguayo 🇺🇾", inlineKeyboardForRates)
  }
  else if (action === "USD") {
    bot.sendMessage(message.chat.id, `La cotizacion del Dolar es ${data[0].Venta}0 ${data[0].CompraUp === true ? '🔺' : '🔻'}`)
  }
  else if (action === "EU") {
    bot.sendMessage(message.chat.id, `La cotizacion del Euro es ${data[3].Venta}0 ${data[3].CompraUp === true ? '🔺' : '🔻'}`)

  }
  else if (action === "BR") {
    bot.sendMessage(message.chat.id, `La cotizacion del Real ${data[2].Venta}0 ${data[2].CompraUp === true ? '🔺' : '🔻'} `)

  }

})

bot.onText(/\/cls/, (msg) => {
  for (let i = 0; i < 101; i++) {
    bot.deleteMessage(msg.chat.id, msg.message_id - i).catch(err => { return err })
  }
})

bot.onText(/\/start/, (msg) => {
  console.log(msg.chat.id)
  bot.sendMessage(msg.chat.id, ' 💸 Soy el bot de cambio elegido por los uruguayos, presiona Cotizaciones para ver los precios 💸', inlineKeyboardForStart)
})







//setInterval(sendCotizaciones, 1000 * 60 * 10);