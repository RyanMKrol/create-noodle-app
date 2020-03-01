import * as fs from 'fs'
import * as path from 'path'
import { currentDirectory } from './../process'

export function createProjecFiles(projectPath: string, sourcePath: string, projectName: string) {
  createDirectory(projectPath)
  createDirectoryContents(sourcePath, projectName)
}

function createDirectory(projectPath) {
  if (fs.existsSync(projectPath)) {
    throw Error(`Folder ${projectPath} exists. Delete or use another name.`)
  }

  fs.mkdirSync(projectPath)
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

export {
  createProjecFiles,
}
