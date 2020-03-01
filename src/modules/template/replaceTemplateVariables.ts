import * as ejs from 'ejs'
import { TemplateData } from './../types'

export function replaceTemplateVariables(content: string, data: TemplateData) {
    return ejs.render(content, data)
}
