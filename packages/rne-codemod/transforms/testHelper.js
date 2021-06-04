"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var p = require('path');
var jscodeshift = require('jscodeshift');
var flowParser = require('flow-parser');
var read = function (fileName) {
    return fs.readFileSync(p.join(__dirname, 
    // @ts-ignore
    global.baseDir, 'transforms', '__testfixtures__', fileName), 'utf8');
};
exports.default = (function (transformName, testFileName) {
    var source = read(testFileName + ".input.tsx");
    var output = read(testFileName + ".output.tsx");
    var transform = require(p.join('../', 'transforms', transformName));
    if (transform.default) {
        transform = transform.default;
    }
    var ast = jscodeshift(source, { parser: flowParser });
    var transformedAst = transform(ast, jscodeshift);
    return {
        expected: output.trim(),
        actual: transformedAst.toSource().trim(),
    };
});
