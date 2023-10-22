import TelegramBot from 'node-telegram-bot-api'
import { correctSatusLogMsg, wrongSatusLogMsg } from '../logger.js'
import { getBetResponse } from '../apiBetResponse/apiRequest.js'

import { config } from 'dotenv'
config()

const botToken = process.env.BOT_TOKEN
const bot = new TelegramBot(botToken, { polling: true })

// Function to fetch and send notifications
async function checkAndSendNotifications () {
  try {
    const response = await getBetResponse()
    const stringResponse = `Evento: ${response.Evento} \nLiga: ${response.Liga} \nLink: ${response.Link}`
    bot.sendMessage(process.env.CHAT_ID, '🧈Partido encontrado: \n' + stringResponse)
    correctSatusLogMsg('Message send ' + response)
  } catch (error) {
    wrongSatusLogMsg('Error fetching bet data: ' + error)
  }
}

// Schedule the function to run at a specific interval (e.g., every 1 minutes)
export const intervalCalls = time => setInterval(checkAndSendNotifications, time)
