import { execSync } from 'child_process'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const CLI_PATH = path.resolve(__dirname, '../../bin/fcli')

const run = (cmd: string) => execSync(cmd, { encoding: 'utf8' as const }).trim()

describe('random command', () => {
  it.skip('should generate random string with default length 10', () => {
    expect(run(`node "${CLI_PATH}" random`)).toMatch(/^[A-Za-z0-9]{10}$/)
  })

  it.skip('should generate random string with specified length', () => {
    expect(run(`node "${CLI_PATH}" random --length 5`)).toMatch(/^[A-Za-z0-9]{5}$/)
  })

  it.skip('should generate random string with length 1', () => {
    expect(run(`node "${CLI_PATH}" random --length 1`)).toMatch(/^[A-Za-z0-9]$/)
  })

  it.skip('should generate random string with large length', () => {
    expect(run(`node "${CLI_PATH}" random --length 100`)).toMatch(/^[A-Za-z0-9]{100}$/)
  })

  it('should handle invalid length (negative)', () => {
    expect(() => run(`node "${CLI_PATH}" random --length -5`)).toThrow()
  })

  it('should handle invalid length (non-number)', () => {
    expect(() => run(`node "${CLI_PATH}" random --length abc`)).toThrow()
  })

  it('should handle invalid length (zero)', () => {
    expect(() => run(`node "${CLI_PATH}" random --length 0`)).toThrow()
  })
})