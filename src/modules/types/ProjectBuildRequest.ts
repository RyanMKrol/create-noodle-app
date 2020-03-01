import { TemplateData } from './'

export interface ProjectBuildRequest {
  projectName: string
  targetPath: string
  sourcePath: string
  templateData: TemplateData
}
