#!/usr/bin/env node

import * as inquirer from 'inquirer'
import * as fs from 'fs'
import * as path from 'path'
import * as shell from 'shelljs'
import chalk from 'chalk'
import * as yargs from 'yargs'

import {
  QUESTIONS,
  createProject,
  createDirectoryContents,
  currentDirectory,
  messageDone,
  TemplateConfig,
  CliOptions,
} from './utils'

inquirer.prompt(QUESTIONS)
  .then(answers => {

    // answers can be passed in on the command line, so we combine them here
    const completeAnswers: object = Object.assign({}, answers, yargs.argv)

    const projectChoice = completeAnswers['template']
    const projectName = completeAnswers['name']
    const repoName = completeAnswers['repo']

    const templatePath = path.join(__dirname, 'templates', projectChoice)
    const targetPath = path.join(currentDirectory(), projectName)
    const templateConfig = getTemplateConfig(templatePath)

    const options: CliOptions = {
      projectName,
      repoName,
      templateName: projectChoice,
      templatePath,
      targetPath,
      config: templateConfig
    }

    if (!createProject(targetPath)) {
      return
    }

    createDirectoryContents(templatePath, projectName, repoName, templateConfig)

    if (!postProcess(options)) {
      return
    }

    messageDone(options)
  })

function getTemplateConfig(templatePath: string): TemplateConfig {
  const configPath = path.join(templatePath, '.template.json')

  if (!fs.existsSync(configPath)) return {}

  const templateConfigContent = fs.readFileSync(configPath)

  if (templateConfigContent) {
    return JSON.parse(templateConfigContent.toString())
  }

  return {}
}

function postProcess(options: CliOptions) {
  if (isNode(options)) {
    return postProcessNode(options)
  }
  return true
}

function isNode(options: CliOptions) {
  return fs.existsSync(path.join(options.templatePath, 'package.json'))
}

function postProcessNode(options: CliOptions) {
  shell.cd(options.targetPath)

  let cmd = ''

  if (shell.which('yarn')) {
    cmd = 'yarn'
  } else if (shell.which('npm')) {
    cmd = 'npm install'
  }

  if (cmd) {
    const result = shell.exec(cmd)

    if (result.code !== 0) {
      return false
    }
  } else {
    console.log(chalk.red('No yarn or npm found. Cannot run installation.'))
  }

  return true
}
