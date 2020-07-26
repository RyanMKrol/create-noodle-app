import * as shell from 'shelljs'
import { ProjectBuildRequest } from './../types'
import { messageProjectInstalled } from './../messages'

export function installProject(request: ProjectBuildRequest) {
  shell.cd(request.targetPath)

  if (!shell.which('npm')) {
    throw new Error('No npm found. Cannot run installation!')
  } else if (!shell.which('git')) {
    throw new Error('No git found. Cannot run installation!')
  } else {
    const gitInitCommand = 'git init'
    const npmInstallCommand = 'npm install'

    const gitResult = shell.exec(gitInitCommand)

    if (gitResult.code !== 0) {
      throw new Error('Installation failed because of git!')
    }

    const npmResult = shell.exec(npmInstallCommand)

    if (npmResult.code !== 0) {
      throw new Error('Installation failed because of npm!')
    }
  }

  messageProjectInstalled()

  return request
}
