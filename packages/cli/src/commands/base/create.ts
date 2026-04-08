import type { Command } from 'commander'
import pc from 'picocolors'
import prompts from 'prompts'

import type { Framework, Template } from '../../../types/template'
import { loadTemplate } from '../../utils/loadTemplate'
import { logger } from '../../utils/logger'
import { validateGivenFramework, validateGivenTemplate } from '../../utils/validate'
import { templateChoices } from '.././../../constants/templates'

type CreateCommandOptions = {
  framework: Framework
  template: Template
  remote?: boolean
}

export const create = (program: Command) => {
  return program
    .createCommand('create')
    .description('create a new project')
    .arguments('<project-name>')
    .helpOption('-h, --help', 'display help for command')
    .option('-f, --framework <framework>', 'framework')
    .option('-t, --template <template>', 'template')
    .option('-r, --remote', 'remote template')
    .action(async (projectName: string, options: CreateCommandOptions) => {
      let { framework, template } = options
      const { remote } = options

      if (remote) {
        await loadTemplate({ projectName, remote, template })
        return
      }
      if (!framework || !validateGivenFramework(framework)) {
        const response = await prompts({
          type: 'select',
          name: 'framework',
          choices: [
            { title: 'Vue', value: 'vue' },
            { title: 'React', value: 'react' },
            { title: 'Vanilla', value: 'vanilla' }
          ],
          message: 'What is your framework?'
        })
        framework = response.framework
      }

      if (!template || !validateGivenTemplate(framework, template)) {
        const response = await prompts({
          type: 'select',
          name: 'template',
          choices: templateChoices[framework],
          message: 'What is your template?'
        })
        template = response.template
      }

      if (!framework || !template) {
        logger.error(pc.red('Invalid framework or template'))
        process.exit(1)
      }

      logger.info(pc.green(`Create project ${projectName} with ${framework} and ${template}`))

      await loadTemplate({ projectName, template, remote })
    })
}
