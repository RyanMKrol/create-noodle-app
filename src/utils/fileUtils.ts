import * as fs from 'fs'
import * as path from 'path'
import chalk from 'chalk'

import {
  replaceTemplateVariables,
  currentDirectory,
  TemplateConfig
} from './'

const SKIP_FILES = ['node_modules', '.template.json']

function createProject(projectPath: string) {
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`))

    return false
  }

  fs.mkdirSync(projectPath)
  return true
}

function createDirectoryContents(templatePath: string, projectName: string, repoName: string, config: TemplateConfig) {
  const filesToCreate = fs.readdirSync(templatePath)
  const dir: string = currentDirectory()

  filesToCreate.forEach(file => {
    const origFilePath = path.join(templatePath, file)

    // get stats about the current file
    const stats = fs.statSync(origFilePath)

    if (SKIP_FILES.indexOf(file) > -1) return

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8')

      contents = replaceTemplateVariables(contents, { projectName, repoName })

      const writePath = path.join(dir, projectName, file)
      fs.writeFileSync(writePath, contents, 'utf8')
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(dir, projectName, file))

      // recursive call
      createDirectoryContents(path.join(templatePath, file), path.join(projectName, file), repoName, config)
    }
  })
}

export {
  createProject,
  createDirectoryContents,
}
