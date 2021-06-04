import { FileInfo, JSCodeshift } from 'jscodeshift';
import textTransform from './text-reduce-props';

const transforms = [textTransform];
console.log('sdaf');
export default (file: FileInfo, api: any) => {
  const j: JSCodeshift = api.jscodeshift;

  let ast = j(file.source);
  transforms.forEach((transform) => {
    ast = transform(ast, j);
  });

  return ast.toSource();
};
