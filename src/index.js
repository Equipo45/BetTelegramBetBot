import { getBetResponse } from './apiBetResponse/apiRequest.js'

async function main () {
  console.log(await getBetResponse())
}
main()
