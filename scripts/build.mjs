import fs from "fs-extra";
import { resolve, join } from "path";
import glob from "fast-glob";

const basePath = join("");

const prefix = "@rneui";

["base-edge", "themed-edge"].map((pkgName) => {
  console.log("Building", pkgName);
  const rnePath = join(basePath, "node_modules", prefix, pkgName, "dist");

  const srcPath = join(basePath, "packages", pkgName, "src");

  if (fs.existsSync(srcPath)) {
    fs.rmSync(srcPath, { recursive: true });
  }

  fs.mkdirSync(srcPath);

  const reg = new RegExp(`${rnePath}/|.js$`, "g");

  glob.sync(join(rnePath, "**/*.js"), { absolute: false }).forEach((file) => {
    const fileName = file.replace(reg, "");
    fs.outputFile(
      join(srcPath, `${fileName}.ts`),
      `export * from "@rneui/${pkgName}/dist/${fileName}";`
    );
  });
});
