import { frameworks, templates } from '../constants/templates'

export type Framework = (typeof frameworks)[number]
export type Template = (typeof templates)[number]
