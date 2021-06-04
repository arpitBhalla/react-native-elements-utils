import { Transform } from "jscodeshift";

const transform: Transform = (file, api, options) => {
  const j = api.jscodeshift;

  const root = j(file.source);

  root
    .findJSXElements("Text")
    .find(j.JSXAttribute, {
      name: {
        type: "JSXIdentifier",
        name: "icon",
      },
      value: {
        type: "StringLiteral",
      },
    })
    .find(j.StringLiteral)
    .replaceWith((nodePath) => {
      const { node } = nodePath;

      // eg: "minus-circle" -> "faMinusCircle"
      const iconDefinition = `fa-${node.value}`;

      return j.jsxExpressionContainer(j.identifier(iconDefinition));
    });

  return root.toSource();
};

export default transform;
