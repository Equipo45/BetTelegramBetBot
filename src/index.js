import { intervalCalls } from './telegramBot/telegramBot.js'

async function main () {
  while (true) {
    await intervalCalls('*/1 * * * *')
  }
}
main()
