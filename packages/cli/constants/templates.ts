export const vueTemplateChoices = [
  {
    title: 'Vue TypeScript',
    value: 'vue-ts'
  },
  {
    title: 'Vue JavaScript',
    value: 'vue'
  }
]

export const reactTemplateChoices = [
  {
    title: 'React TypeScript',
    value: 'react-ts'
  },
  {
    title: 'React JavaScript',
    value: 'react'
  }
]

export const templateChoices = {
  vue: vueTemplateChoices,
  react: reactTemplateChoices
}

export const frameworks = ['vue', 'react'] as const
export const templates = ['vue-ts', 'vue', 'react-ts', 'react'] as const
