import { Command } from 'commander'
import pc from 'picocolors'

import { logger } from '../../utils/logger'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export const random = (program: Command) =>
  program
    .createCommand('random')
    .description('Generate random string')
    .option('-l, --length <length>', 'length of random string', '10')
    .action((options: { length: string }) => {
      const length = parseInt(options.length, 10)
      if (isNaN(length) || length <= 0) {
        logger.error(pc.red('Invalid length. Please provide a positive number.'))
        process.exit(1)
      }

      let result = ''
      for (let i = 0; i < length; i++) {
        result += CHARS[Math.floor(Math.random() * CHARS.length)]
      }

      logger.log(pc.green(result))
    })
