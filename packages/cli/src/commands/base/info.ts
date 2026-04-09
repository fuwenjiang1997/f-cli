import { Command } from 'commander'
import pc from 'picocolors'

import pkg from '../../../package.json'
import { logger } from '../../utils/logger'

export const info = (program: Command) =>
  program
    .createCommand('info')
    .description('Display info about the CLI')
    .action(() => {
      logger.log(pc.bgGreen(`Product: f-cli v${pkg.version}`))
      logger.log(pc.green('Author: fuwenjiang1997'))
      logger.log(pc.underline('Repository: https://github.com/fuwenjiang1997/f-cli.git'))
    })
