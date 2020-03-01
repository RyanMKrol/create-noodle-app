#!/usr/bin/env node

import * as inquirer from 'inquirer'
import chalk from 'chalk'

import { QUESTIONS } from './modules/questions'
import { createProjectFiles } from './modules/files'
import { installProject } from './modules/install'
import { setupProjectBuildRequestObject } from './modules/request'
import { pipe } from './modules/utils'

async function main() {
  // get details from the user
  const answers = await inquirer.prompt(QUESTIONS)

  // start the process of creating a project
  try {
    pipe(
      setupProjectBuildRequestObject,
      createProjectFiles,
      installProject,
    )(answers)
  } catch (error) {
    console.log(chalk.red(`Something went wrong and the project could not be created`))
    console.log(chalk.red(`${error}`))
  }
}

main()
