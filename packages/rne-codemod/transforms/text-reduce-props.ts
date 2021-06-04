import { FileInfo, JSCodeshift } from "jscodeshift";

export default function transformer(
  file: FileInfo,
  api: { jscodeshift: JSCodeshift }
) {
  const j: JSCodeshift = api.jscodeshift;

  let ast = j(file.source);

  const textComponent = ast.findJSXElements("Text");

  textComponent.forEach((nodePath) => {
    const styles: any = {};
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
          if (node.value && node.value.type === "JSXExpressionContainer") {
            node.value = j.jsxExpressionContainer(
              j.conditionalExpression(
                node.value,
                j.stringLiteral(size),
                j.stringLiteral("")
              )
            );
          } else {
            node.value = j.stringLiteral(size);
          }

          return node;
        });
      j(nodePath)
        .find(j.JSXAttribute, {
          name: {
            type: "JSXIdentifier",
            name: `${size}Style`,
          },
        })
        .forEach((childNodePath) => {
          const { node } = childNodePath;
          //@ts-ignore
          styles[size] = node.value.expression;
          j(childNodePath).remove();
        });
    });

    let styleNode = j(nodePath).find(j.JSXAttribute, {
      name: {
        type: "JSXIdentifier",
        name: "style",
      },
    });
    if (!styleNode.length) {
      styleNode = j(nodePath).insertAfter("");
    } else {
      //@ts-ignore
      styles["style"] = styleNode.nodes()[0].value.expression;
    }

    styleNode.replaceWith((childPath) => {
      const { node } = childPath;
      node.value = j.jsxExpressionContainer(
        j.objectExpression(
          Object.entries(styles).map(([key, val]) =>
            //@ts-ignore
            j.objectProperty(j.stringLiteral(key), val)
          )
        )
      );

      return node;
    });
  });

  return ast.toSource();
}
