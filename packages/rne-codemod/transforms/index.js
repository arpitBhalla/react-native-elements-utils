"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cardTransform_1 = __importDefault(require("./cardTransform"));
var transforms = [cardTransform_1.default];
exports.default = (function (file, api, options) {
    var j = api.jscodeshift;
    var ast = j(file.source);
    transforms.forEach(function (transform) {
        ast = transform(ast, j);
    });
    return ast.toSource();
});
