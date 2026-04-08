import { Framework, Template } from "types/template";
import { frameworks, templates } from "constants/templates";

export const validateFramework = (framework: Framework) => {
  if (!frameworks.includes(framework)) {
    throw new Error(`Framework ${framework} is not supported`);
  }
};

export const validateTemplate = (template: Template) => {
  if (!templates.includes(template)) {
    throw new Error(`Template ${template} is not supported`);
  }
};
