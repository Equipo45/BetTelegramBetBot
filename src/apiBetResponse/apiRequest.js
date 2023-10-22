import axios from 'axios'
import chalk from 'chalk'
import path from 'node:path'
import querystring from 'querystring'

import { config } from 'dotenv'
config()

const BASE_URL = 'https://rest-api-lv.betburger.com'
const VALUE_URL = '/api/v1/valuebets/bot_pro_search'
const ARBITRAGE_URL = '/api/v1/arbs/bot_pro_search'

const HEADERS = {
  accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded'
}

export async function getBetResponse (numberFilterArr = [1], arbitrage = false) {
  let response
  const params = {
    event_id: '',
    excluded_events: [],
    search_filter: numberFilterArr,
    max_arbs_by_event: '',
    sort_by: 'valuebet_percent',
    excluded_bets: [],
    excluded_bk_events: [],
    bookmakers2: ['Bet365', 'Bwin', 'Codere', 'Luckia', 'WilliamHill'],
    access_token: process.env.ACCESS_TOKEN,
    grouped: ''
  }
  try {
    const relativeUrl = arbitrage ? ARBITRAGE_URL : VALUE_URL
    response = await axios.post(path.join(BASE_URL, relativeUrl), querystring.stringify(params), { HEADERS })
  } catch (e) {
    response = {
      status: 400,
      errMsg: 'Failed while sending post'
    }
    console.log(chalk.red('Failed while sending post to VALUE url' + e))
  }

  return parseResponse(response)
}

function parseResponse (response) {
  if (response.errMsg || response.status >= 400) return { status: 400 }
  return response.data
}
