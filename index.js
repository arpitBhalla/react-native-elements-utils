#!/usr/bin/env node
const chokidar = require("chokidar");
const chalk = require("chalk");
const { dtsPlugin } = require("esbuild-plugin-d.ts");
const { build } = require("esbuild");
const { Command } = require("commander");
const { join } = require("path");

const program = new Command();
program.version("1.1.1");

const watcher = chokidar.watch("./src/**", {
  ignored: /__tests__/,
  persistent: true,
});

program.option("-d, --dir <path>", "path of rne-demo app");

program.parse(process.argv);

const options = program.opts();
const outPath = join(
  __dirname,
  options.dir || "../react-native-elements-app",
  "/node_modules/react-native-elements/dist"
);

console.log();
const log = console.log.bind(console, chalk.blue.bold("[RNE]"));

log(chalk.blue.bold("React Native Elements"));

watcher
  .on("ready", () =>
    log(chalk.italic.yellowBright("Watching for file changes"))
  )
  .on("change", (path) => {
    try {
      log(chalk.yellow("Change detected at"), chalk.blue(path));

      build({
        jsx: "preserve",
        format: "esm",
        entryPoints: [path],
        outfile: path
          .replace(/^src/, outPath)
          .replace(/ts$/, "js")
          .replace(/tsx$/, "jsx"),
        plugins: [dtsPlugin({ outDir: outPath })],
      }).finally(() => {
        log(chalk.green.bold(`Copied to ${outPath}`));
      });
    } catch (error) {
      log(chalk.red.bold("Error"));
    }
  });
