import * as fs from 'fs'
import * as path from 'path'

import { currentDirectory } from './../utils'
import { ProjectBuildRequest } from './../types'
import { messageFilesCreated } from './../messages'

export function createProjectFiles(request: ProjectBuildRequest) {
  createDirectory(request.targetPath)
  createDirectoryContents(request.sourcePath, request.projectName)

  messageFilesCreated()

  return request
}

function createDirectory(targetPath: string) {
  if (fs.existsSync(targetPath)) {
    throw Error(`Folder ${targetPath} exists. Delete or use another name.`)
  }

  fs.mkdirSync(targetPath)
}

function createDirectoryContents(sourcePath: string, projectName: string) {
  const filesToCreate = fs.readdirSync(sourcePath)
  const dir: string = currentDirectory()

  filesToCreate.forEach(file => {
    const sourceFilePath = path.join(sourcePath, file)
    const targetFilePath = path.join(dir, projectName, file)

    // get stats about the current file
    const stats = fs.statSync(sourceFilePath)

    if (stats.isFile()) {
      const contents = fs.readFileSync(sourceFilePath, 'utf8')
      fs.writeFileSync(targetFilePath, contents, 'utf8')
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(dir, projectName, file))

      // recursive call
      createDirectoryContents(path.join(sourcePath, file), path.join(projectName, file))
    }
  })
}
