"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var oldNames = ['CardCover', 'CardActions', 'CardContent'];
var allNames = [
    { oldName: 'CardCover', newName: 'Card.Cover' },
    { oldName: 'CardActions', newName: 'Card.Actions' },
    { oldName: 'CardContent', newName: 'Card.Content' },
];
var transform = function (ast, j) {
    var importPath = ast.find(j.ImportDeclaration, {
        type: 'ImportDeclaration',
        source: {
            type: 'Literal',
            value: 'react-native-paper',
        },
    });
    var imported = importPath.find(j.ImportSpecifier, {
        type: 'ImportSpecifier',
    });
    var filtered = imported.filter(function (nodePath) {
        return oldNames.includes(nodePath.node.imported.name);
    });
    var cardImport = imported.filter(function (nodePath) { return nodePath.node.imported.name === 'Card'; });
    if (filtered.length > 0 && cardImport.length === 0) {
        var newImport = j.importSpecifier(j.identifier('Card'));
        imported.at(0).insertBefore(newImport);
    }
    else if (filtered.length === 0) {
        return ast;
    }
    filtered.remove();
    allNames.forEach(function (_a) {
        var oldName = _a.oldName, newName = _a.newName;
        var openingTags = ast.find(j.JSXOpeningElement, {
            type: 'JSXOpeningElement',
            name: {
                name: oldName,
            },
        });
        var closingTags = ast.find(j.JSXClosingElement, {
            type: 'JSXClosingElement',
            name: {
                name: oldName,
            },
        });
    });
    return ast;
};
