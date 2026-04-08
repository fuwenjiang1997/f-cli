import { program } from "commander";
import pkg from "../../package.json";
import { registerCommands } from "./registerCommands";
import { create } from "./base/create";

program.version(pkg.version).description(pkg.description);

registerCommands(create);
