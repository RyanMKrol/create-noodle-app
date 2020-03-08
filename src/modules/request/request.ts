import * as path from 'path'
import * as yargs from 'yargs'

import { ProjectBuildRequest } from './../types'
import { currentDirectory } from './../utils'

export function setupProjectBuildRequestObject(answers: any): ProjectBuildRequest {
  const completeAnswers: object = Object.assign({}, answers, yargs.argv)

  const projectChoice = completeAnswers['template']
  const projectName = completeAnswers['name']
  const repoName = completeAnswers['repo'] || completeAnswers['name']

  return {
    projectName: projectName,
    targetPath: path.join(currentDirectory(), projectName),
    sourcePath: path.join(__dirname, './../../templates', projectChoice),
    templateData: {
      projectName: projectName,
      repoName: repoName,
    }
  }
}
