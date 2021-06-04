import { FileInfo, JSCodeshift } from 'jscodeshift';
import cardTransform from './cardTransform';

const transforms = [cardTransform];

export default (file: FileInfo, api: JSCodeshift, options: any) => {
  const j = api.jscodeshift;

  let ast = j(file.source);
  transforms.forEach((transform) => {
    ast = transform(ast, j);
  });

  return ast.toSource();
};
