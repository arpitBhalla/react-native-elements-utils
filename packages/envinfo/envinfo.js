#!/usr/bin/env node
const envinfo = require("envinfo");

envinfo
  .run(
    {
      npmPackages: `{${[
        "@rneui/*",
        "react-native-elements",
        "expo",
        "typescript",
        "react-native",
      ]}}`,
      npmGlobalPackages: ["expo", "typescript", "react-native-cli"],
    },
    {
      json: false,
      showNotFound: true,
      markdown: true,
      duplicates: false,
    }
  )
  .then((env) => console.log(env));
