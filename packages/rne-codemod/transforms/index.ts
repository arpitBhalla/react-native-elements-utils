import { Transform } from 'jscodeshift';
const cardTransform = require('./cardTransform');

const transforms = [cardTransform];

const me: Transform = (file, api, options) => {
  const j = api.jscodeshift;

  let ast = j(file.source);
  transforms.forEach((transform) => {
    ast = transform(ast, j);
  });

  return ast.toSource();
};
