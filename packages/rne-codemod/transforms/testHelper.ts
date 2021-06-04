const fs = require('fs');
const p = require('path');
const jscodeshift = require('jscodeshift');
const flowParser = require('flow-parser');

const read = (fileName: string) =>
  fs.readFileSync(
    p.join(
      __dirname,
      // @ts-ignore
      global.baseDir,
      'transforms',
      '__testfixtures__',
      fileName
    ),
    'utf8'
  );

export default (transformName: any, testFileName: any) => {
  const source = read(`${testFileName}.input.tsx`);
  const output = read(`${testFileName}.output.tsx`);
  let transform = require(p.join('../', 'transforms', transformName));

  if (transform.default) {
    transform = transform.default;
  }

  const ast = jscodeshift(source, { parser: flowParser });
  const transformedAst = transform(ast, jscodeshift);

  return {
    expected: output.trim(),
    actual: transformedAst.toSource().trim(),
  };
};
