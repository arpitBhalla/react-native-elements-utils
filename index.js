#!/usr/bin/env node
const chokidar = require("chokidar");
const chalk = require("chalk");
const { exec } = require("child_process");
const { Command } = require("commander");
const program = new Command();
program.version("1.0.0");

const watcher = chokidar.watch("./src/**", {
  ignored: /__tests__/,
  persistent: true,
});

program.option("-d, --dir <path>", "path of rne-demo app");

program.parse(process.argv);

const options = program.opts();
const demoAppPath = options.dir || "../react-native-elements-app";

console.log();
const log = (...args) => console.log(chalk.blue.bold("[RNE]", ...args));

log(chalk.blue.bold("React Native Elements"));

watcher
  .on("ready", () =>
    log(chalk.italic.yellowBright("Watching for file changes"))
  )
  .on("change", (path) => {
    try {
      log(chalk.yellow("Change detected at", path, "transpiling & copying..."));
      exec(
        `tsc && cp -r ./dist ./${demoAppPath}/node_modules/react-native-elements/`
      )
        .on("error", () => console.log("ERROR"))
        .on("close", () =>
          log(
            chalk.green.bold(
              `Copied to ${demoAppPath}, change a file to re-compile`
            )
          )
        );
    } catch (error) {
      log(chalk.red.bold("Error"));
    }
  });
