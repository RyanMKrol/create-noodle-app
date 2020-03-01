export interface TemplateConfig {
  files?: string[]
  postMessage?: string
}

export interface CliOptions {
  projectName: string
  repoName: string
  templateName: string
  templatePath: string
  targetPath: string
  config: TemplateConfig
}
