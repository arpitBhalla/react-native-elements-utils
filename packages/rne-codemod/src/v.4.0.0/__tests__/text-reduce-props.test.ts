// transforms/__tests__/implicit-icons-to-explicit-imports.ts
import { defineTest } from "jscodeshift/dist/testUtils";

describe("implicit-icons-to-explicit-imports", () => {
  defineTest(
    __dirname,
    "implicit-icons-to-explicit-imports",
    null,
    `implicit-icons-to-explicit-imports/basic`,
    { parser: "tsx" }
  );
});
