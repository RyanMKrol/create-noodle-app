import * as shell from 'shelljs'
import { ProjectBuildRequest } from './../types'
import { messageProjectInstalled } from './../messages'

export function installProject(request: ProjectBuildRequest) {
  shell.cd(request.targetPath)

  const command = 'npm install'

  if (!shell.which('npm')) {
    throw new Error('No npm found. Cannot run installation!')
  } else {
    const result = shell.exec(command)

    if (result.code !== 0) {
      throw new Error('Installation failed!')
    }
  }

  messageProjectInstalled()

  return request
}
