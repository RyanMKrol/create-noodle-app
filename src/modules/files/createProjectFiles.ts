import * as fs from 'fs'
import * as path from 'path'

import { currentDirectory } from './../utils'
import { ProjectBuildRequest, TemplateData } from './../types'
import { replaceTemplateVariables } from './../template'
import { messageFilesCreated } from './../messages'

export function createProjectFiles(request: ProjectBuildRequest) {
  createDirectory(request.targetPath)
  createDirectoryContents(request.sourcePath, request.projectName, request.templateData)

  messageFilesCreated()

  return request
}

function createDirectory(targetPath: string) {
  if (fs.existsSync(targetPath)) {
    throw Error(`Folder ${targetPath} exists. Delete or use another name.`)
  }

  fs.mkdirSync(targetPath)
}

function createDirectoryContents(sourcePath: string, projectName: string, templateData: TemplateData) {
  const filesToCreate = fs.readdirSync(sourcePath)
  const dir: string = currentDirectory()

  filesToCreate.forEach(file => {
    const sourceFilePath = path.join(sourcePath, file)
    const targetFilePath = path.join(dir, projectName, file)

    // get stats about the current file
    const stats = fs.statSync(sourceFilePath)

    if (stats.isFile()) {
      const rawSourceContent = fs.readFileSync(sourceFilePath, 'utf8')
      const targetContents = replaceTemplateVariables(rawSourceContent, templateData)

      fs.writeFileSync(targetFilePath, targetContents, 'utf8')
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(dir, projectName, file))

      // recursive call
      createDirectoryContents(path.join(sourcePath, file), path.join(projectName, file), templateData)
    }
  })
}
