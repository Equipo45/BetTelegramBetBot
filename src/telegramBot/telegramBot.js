import TelegramBot from 'node-telegram-bot-api'
import schedule from 'node-schedule'
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
    bot.sendMessage(process.env.CHAT_ID, 'New bet request found: ' + JSON.stringify(response))
    correctSatusLogMsg('Message send ' + response)
  } catch (error) {
    wrongSatusLogMsg('Error fetching bet data:', error)
  }
}

// Schedule the function to run at a specific interval (e.g., every 1 minutes)
export const intervalCalls = async time => schedule.scheduleJob(time, checkAndSendNotifications)
