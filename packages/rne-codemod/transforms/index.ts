import { FileInfo, JSCodeshift } from 'jscodeshift';
import textTransform from './text-reduce-props';

const transforms = [textTransform];

export default (file: FileInfo, api: JSCodeshift) => {
  const j = api.jscodeshift;

  let ast = j(file.source);
  transforms.forEach((transform) => {
    ast = transform(ast, j);
  });

  return ast.toSource();
};
