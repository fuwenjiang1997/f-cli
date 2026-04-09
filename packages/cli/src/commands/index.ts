import { program } from 'commander'

import pkg from '../../package.json'

import { create } from './base/create'
import { info } from './base/info'
import { registerCommands } from './registerCommands'

program.version(pkg.version).description(pkg.description)

registerCommands(create)
registerCommands(info)
