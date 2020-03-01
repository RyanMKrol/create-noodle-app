import chalk from 'chalk'
import { CliOptions } from './'

export function messageDone(options: CliOptions) {
  console.log('')
  console.log(chalk.green('Done.'))
  console.log(chalk.green(`Go into the project: cd ${options.projectName}`))

  const message = options.config.postMessage

  if (message) {
    console.log('')
    console.log(chalk.yellow(message))
    console.log('')
  }

}
