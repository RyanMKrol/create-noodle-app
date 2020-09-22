import * as fs from 'fs'
import * as path from 'path'

import { currentDirectory } from './../utils'
import { ProjectBuildRequest, TemplateData } from './../types'
import { replaceTemplateVariables } from './../template'
import { messageFilesCreated } from './../messages'

const DEFAULT_GROUP_PERMISSIONS = '5'
const DEFAULT_OTHER_PERMISSIONS = '5'

export function createProjectFiles(request: ProjectBuildRequest) {
  createDirectory(request.targetPath)
  createDirectoryContents(
    request.sourcePath,
    request.projectName,
    request.templateData
  )

  messageFilesCreated()

  return request
}

function createDirectory(targetPath: string) {
  if (fs.existsSync(targetPath)) {
    throw Error(`Folder ${targetPath} exists. Delete or use another name.`)
  }

  fs.mkdirSync(targetPath)
}

function createDirectoryContents(
  sourcePath: string,
  projectName: string,
  templateData: TemplateData
) {
  const filesToCreate = fs.readdirSync(sourcePath)
  const dir: string = currentDirectory()

  filesToCreate.forEach(sourceFileName => {
    const file = convertSpecialFilenames(sourceFileName)

    const sourceFilePath = path.join(sourcePath, sourceFileName)
    const targetFilePath = path.join(dir, projectName, file)

    // get stats about the current file
    const stats = fs.statSync(sourceFilePath)

    if (stats.isFile()) {
      const rawSourceContent = fs.readFileSync(sourceFilePath, 'utf8')
      const targetContents = replaceTemplateVariables(
        rawSourceContent,
        templateData
      )

      let isReadable = 1
      let isWriteable = 1
      let isExecutable = 1

      // Check if the file is readable.
      fs.access(sourceFilePath, fs.constants.R_OK, err => {
        isReadable = 0
      })

      // Check if the file is writable.
      fs.access(sourceFilePath, fs.constants.W_OK, err => {
        isWriteable = 0
      })

      // Check if the file is executable.
      fs.access(sourceFilePath, fs.constants.X_OK, err => {
        isExecutable = 0
      })

      const binaryUserPermissionsValue = `${isReadable}${isWriteable}${isExecutable}`
      const decimalUserPermissionsValue = Number.parseInt(
        binaryUserPermissionsValue,
        2
      )

      fs.writeFileSync(targetFilePath, targetContents, 'utf8')

      fs.chmod(
        targetFilePath,
        `${decimalUserPermissionsValue}${DEFAULT_GROUP_PERMISSIONS}${DEFAULT_OTHER_PERMISSIONS}`,
        error => {
          if (error) {
            console.log(
              `Unable to change permissions of file:${targetFilePath}, due to error: ${error}`
            )
          }
        }
      )
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(dir, projectName, file))

      // recursive call
      createDirectoryContents(
        path.join(sourcePath, file),
        path.join(projectName, file),
        templateData
      )
    }
  })
}

function convertSpecialFilenames(filename: string): string {
  // when publishing this tool, NPM pays attention to every package.json file,
  // so when I have a template that's intended for publishing new NPM files, that
  // template package.json file messes up the deployment of this tool. To get around
  // that, I've stored the template's package.json as package.txt, and I convert it
  // here
  if (filename === 'package.txt') {
    return 'package.json'
  }

  if (filename === 'gitignore.txt') {
    return '.gitignore'
  }

  return filename
}
