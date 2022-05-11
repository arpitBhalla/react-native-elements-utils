import fetch from "node-fetch";
import fs from "fs-extra";
import { join } from "path";

const rootPath = join("");

async function main(pkg) {
  const srcPath = join(rootPath, "packages", `${pkg}-edge`, "src");

  const BASE_PATH =
    "https://api.github.com/repos/react-native-elements/react-native-elements/git/trees/" +
    pkg;

  if (fs.existsSync(srcPath)) {
    fs.rmSync(srcPath, { recursive: true });
  }

  fs.mkdirpSync(srcPath);

  const root = await fetch(BASE_PATH)
    .then((res) => res.json())
    .catch(console.log);
  console.log(root);
  const { url } = root.tree?.find(({ path }) => {
    return path === "dist";
  });
  const { tree } = await fetch(url + "?recursive=1").then((res) => res.json());
  tree.forEach(({ type, path = "" }) => {
    if (type === "blob" && !path.endsWith("d.ts")) {
      const fileName = path.pop().replace(".js", "");
      fs.outputFile(
        join(srcPath, `${path.replace(".js", ".tsx")}`),
        `export * from "@rneui/${pkg}-edge/dist/${fileName}";`
      );
    }
  });
}

console.log("fetching tree...");

["base", "themed"].map(main);
