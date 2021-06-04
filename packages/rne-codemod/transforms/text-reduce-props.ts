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
    let done = false;
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
          if (!done) {
            node.name = j.jsxIdentifier("variant");
            node.value = j.stringLiteral(size);
            done = true;
          }
          return node;
        });
      // j(nodePath)
      //   .find(j.JSXAttribute, {
      //     name: {
      //       type: "JSXIdentifier",
      //       name: `${size}Style`,
      //     },
      //   })
      //   .forEach((childNodePath) => {
      //     styles[size] = { ASDf: "sad" };
      //     // j(childNodePath).remove();
      //   });
    });
    // const styleNodePath = j(nodePath).find(j.JSXAttribute, {
    //   name: {
    //     type: "JSXIdentifier",
    //     name: "style",
    //   },
    // });
    // styleNodePath.replaceWith((childPath) => {
    //   const { node } = childPath;

    //   node.value = j.jsxExpressionContainer(
    //     j.objectExpression([
    //       j.property("init", j.stringLiteral("sad"), j.stringLiteral("asf")),
    //       j.spreadElement(j.stringLiteral("sd")),
    //     ])
    //   );

    //   return node;
    // });
  });

  return ast.toSource();
}
