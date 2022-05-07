const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "node_modules", "@rneui", "base-edge", "dist");

fs.readdirSync(p).forEach((file) => {
  console.log(file);
  fs.writeFileSync(
    path.join(__dirname, "src", `${file}.ts`),
    `export * from "@rneui/base-edge/dist/${file}";`
  );
});
