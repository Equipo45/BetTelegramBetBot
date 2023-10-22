import chalk from 'chalk'

export function correctSatusLogMsg (msg) {
  console.log(chalk.bgBlue(msg))
}
export function wrongSatusLogMsg (msg) {
  console.error(chalk.redBright(msg))
}
