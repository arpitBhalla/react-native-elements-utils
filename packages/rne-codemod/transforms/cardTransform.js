"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (ast, j) {
    var textComponent = ast.findJSXElements('Text');
    textComponent
        .find(j.JSXAttribute, {
        name: {
            type: 'JSXIdentifier',
            name: 'h1',
        },
        value: {},
    })
        .replaceWith(function (nodePath) { });
});
