import * as fs from 'fs'
import * as path from 'path'
import * as yargs from 'yargs'

const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'))

const QUESTIONS = [
  {
    name: 'template',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES,
    when: () => !yargs.argv['template']
  },
  {
    name: 'name',
    type: 'input',
    message: 'Project name (required):',
    when: () => !yargs.argv['name'],
    validate: (input: string) => {
      if (input.length === 0) {
        return 'Must provide a project name!'
      }

      if (!(/^([A-Za-z\-\_\d])+$/.test(input))) {
        return 'Project name may only include letters, numbers, underscores and hashes.'
      }

      return true
    }
  },
  {
    name: 'repo',
    type: 'input',
    message: 'Git Repo (required):',
    when: () => !yargs.argv['repo'],
    validate: (input: string) => {
      if (input.length === 0) {
        return 'Must provide a git repo name!'
      }

      if (!(/^([A-Za-z\-\_\d])+$/.test(input))) {
        return 'Git repo name may only include letters, numbers, underscores and hashes.'
      }

      return true
    }
  }
]

export default QUESTIONS
