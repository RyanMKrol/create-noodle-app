import * as ejs from 'ejs'

export interface TemplateData {
    projectName: string
    repoName: string
}

export function replaceTemplateVariables(content: string, data: TemplateData) {
    return ejs.render(content, data)
}
