import fs, { readdirSync, writeFileSync } from "fs";
import { resolve, join } from "path";

const pkgName = "@rneui/base-edge";

const basePath = resolve();

const rnePath = join(basePath, "node_modules", pkgName, "dist");

const srcPath = join(basePath, "src");

if (fs.existsSync(srcPath)) {
  fs.rmSync(srcPath, { recursive: true });
}

fs.mkdirSync(srcPath);

readdirSync(rnePath).forEach((file) => {
  if (!file.startsWith("index"))
    writeFileSync(
      join(srcPath, `${file}.ts`),
      `export * from "${pkgName}/dist/${file}";`
    );
});

writeFileSync(join(srcPath, `index.ts`), `export * from "${pkgName}/dist";`);
