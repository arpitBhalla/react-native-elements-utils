"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cardTransform = require('./cardTransform');
var transforms = [cardTransform];
var me = function (file, api, options) {
    var j = api.jscodeshift;
    var ast = j(file.source);
    transforms.forEach(function (transform) {
        ast = transform(ast, j);
    });
    return ast.toSource();
};
