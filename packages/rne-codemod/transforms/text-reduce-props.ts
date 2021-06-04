import { FileInfo, JSCodeshift } from "jscodeshift";

export default function transformer(
  file: FileInfo,
  api: { jscodeshift: JSCodeshift }
) {
  const j: JSCodeshift = api.jscodeshift;

  let ast = j(file.source);

  const textComponent = ast.findJSXElements("Text");

  textComponent.forEach((nodePath) => {
    const styleNodePath = j(nodePath).find(j.JSXAttribute, {
      name: {
        type: "JSXIdentifier",
        name: "style",
      },
    });

    styleNodePath.replaceWith((childPath) => {
      const { node } = childPath;
      console.log("ASDas", JSON.stringify(node.value));
      node.value = j.jsxExpressionContainer(
        j.objectExpression(j.objectProperty())
      );

      return node;
    });

    ["h1", "h2", "h3", "h4"].forEach((size) => {
      j(nodePath)
        .find(j.JSXAttribute, {
          name: {
            type: "JSXIdentifier",
            name: size,
          },
        })
        .replaceWith((childPath) => {
          const { node } = childPath;
          node.name = j.jsxIdentifier("variant");
          node.value = j.stringLiteral(size);

          return node;
        });
    });
  });
  // ['h1', 'h2', 'h3', 'h4'].forEach((e) => {
  //   textComponent
  //     .find(j.JSXAttribute, {
  //       name: {
  //         type: 'JSXIdentifier',
  //         name: e,
  //       },
  //     })
  //     .forEach((childNodePath) => {
  //       j(childNodePath).replaceWith((nodePath) => {
  //         const { node } = nodePath;
  //         node.name = j.jsxIdentifier('variant');
  //         node.value = j.stringLiteral(e);

  //         return node;
  //       });
  //     });
  // });

  return ast.toSource();
}
