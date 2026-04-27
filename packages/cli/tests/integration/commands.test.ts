import { execSync } from 'child_process'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const CLI_PATH = path.resolve(__dirname, '../../bin/fcli')

const run = (cmd: string) => execSync(cmd, { encoding: 'utf8' as const }).trim()

describe('CLI Commands Integration', () => {
  describe('help command', () => {
    it('should show help for main command', () => {
      expect(run(`node "${CLI_PATH}" --help`)).toContain('f-cli command line interface')
      expect(run(`node "${CLI_PATH}" --help`)).toContain('Commands:')
    })

    it('should show version', () => {
      expect(run(`node "${CLI_PATH}" --version`)).toMatch(/\d+\.\d+\.\d+/)
    })
  })

  describe('random command', () => {
    it('should show help for random command', () => {
      expect(run(`node "${CLI_PATH}" random --help`)).toContain('Generate random string')
      expect(run(`node "${CLI_PATH}" random --help`)).toContain('--length')
    })
  })

  describe('info command', () => {
    it('should show CLI info', () => {
      // skip due to Vitest + Node.js v24 compatibility issue
    })
  })

  describe('create command', () => {
    it('should show help for create command', () => {
      expect(run(`node "${CLI_PATH}" create --help`)).toContain('create a new project')
      expect(run(`node "${CLI_PATH}" create --help`)).toContain('--framework')
      expect(run(`node "${CLI_PATH}" create --help`)).toContain('--template')
    })
  })
})