import { type Command, program } from 'commander'

type Fn = (program: Command) => Command
export const registerCommands = (fn: Fn) => {
  program.addCommand(fn(program))
}
