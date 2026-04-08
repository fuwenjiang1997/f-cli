import { Template } from "types/template";
import { copy, readJson, remove, writeJson } from "fs-extra";
import ora from "ora";
import { join } from "node:path";
import pc from "picocolors";
import { logger } from "./logger";
import { downloadTemplate } from "giget";

export type LoadLocalTemplateOptions = {
  projectName: string;
  template: Template;
};
export type LoadRemoteTemplateOptions = {
  projectName: string;
};

export type LoadTemplateOptions = {
  remote?: boolean;
} & LoadLocalTemplateOptions &
  LoadRemoteTemplateOptions;

export const generatePackageJson = async (projectName: string) => {
  const projectPath = join(process.cwd(), projectName);
  const originPkg = await readJson(join(projectPath, "package.json"));
  await writeJson(
    join(projectPath, "package.json"),
    {
      ...originPkg,
      name: projectName,
      version: "0.0.1",
    },
    {
      spaces: 4,
    },
  );
};

const loadRemoteTemplate = async (options: LoadRemoteTemplateOptions) => {
  const { projectName } = options;
  const spinner = ora({
    text: "Downloading remote template...",
    color: "green",
  }).start();

  try {
    const { dir } = await downloadTemplate(
      "https://codeload.github.com/design-sparx/antd-multipurpose-dashboard/tar.gz/refs/heads/main",
      {
        dir: `${process.cwd()}/.temp`,
      },
    );
    await copy(dir, `${process.cwd()}/${projectName}`);
    spinner.text = "Copy tempalte success";
    await generatePackageJson(projectName);
    spinner.spinner = "moon";
    spinner.text = pc.green(
      `Project named ${pc.bold(projectName)} created successfully!`,
    );
    spinner.succeed();
    await remove(`${process.cwd()}/.temp`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(pc.red(`Download template failed. ${error.message}`));
    }
    spinner.fail();
  }
};
const loadLocalTemplate = async (options: LoadLocalTemplateOptions) => {
  const { projectName, template } = options;
  const spinner = ora({
    text: "Copy template loading...",
    color: "green",
  }).start();

  try {
    const templatePath = join(
      __dirname,
      `../../templates/template-${template}`,
    );

    await copy(templatePath, `${process.cwd()}/${projectName}`);
    spinner.text = "Copy template success";
    /**
     * 更新 package.json
     */
    await generatePackageJson(projectName);
    spinner.spinner = "moon";
    spinner.text = pc.green(
      `Project named ${pc.bold(projectName)} created successfully!`,
    );
    spinner.succeed();
    await remove(`${process.cwd()}/.temp`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(pc.red(`Copy template failed. ${error.message}`));
    }
    spinner.fail();
  }
};

export const loadTemplate = (options: LoadTemplateOptions) => {
  if (options.remote) {
    loadRemoteTemplate(options);
  } else {
    loadLocalTemplate(options);
  }
};
