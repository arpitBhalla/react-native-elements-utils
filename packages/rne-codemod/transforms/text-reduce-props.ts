import { Collection, JSCodeshift } from 'jscodeshift';

export default (ast: Collection, j: JSCodeshift) => {
  const textComponent = ast.findJSXElements('Text');
  let variantDone = false;
  ['h1', 'h2', 'h3', 'h4'].forEach((e) => {
    textComponent
      .find(j.JSXAttribute, {
        name: {
          type: 'JSXIdentifier',
          name: e,
        },
      })
      .replaceWith((nodePath) => {
        const { node } = nodePath;
        if (!variantDone) {
          node.name.name = 'koko';
          variantDone = true;
        }
        return node;
      });
  });

  return ast;
};
