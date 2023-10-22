import { intervalCalls } from './telegramBot/telegramBot.js'

const TIME_INTERVAL = 10000

async function main () {
  let intervalId = null
  if (intervalId === null) {
    intervalId = intervalCalls(TIME_INTERVAL)
  }
}
main()
