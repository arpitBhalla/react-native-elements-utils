"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_elements_1 = require("react-native-elements");
var App = function () {
    return (<>
      <react_native_elements_1.Text variant="h1"/>
      <react_native_elements_1.Text variant="h1">My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text variant="h2">My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text variant="h3">My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text variant="h4">My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text style={{ h1: { color: 'blue' } }}>My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text style={{ h2: { color: 'blue' } }}>My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text style={{ h3: { color: 'blue' } }}>My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text style={{ h4: { color: 'blue' } }}>My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text variant="h4" style={{ h4: { color: 'blue' } }}>
        My Text
      </react_native_elements_1.Text>
      <react_native_elements_1.Text variant="h4" style={{ backgroundColor: 'blue', h4: { color: 'blue' } }}>
        My Text
      </react_native_elements_1.Text>
    </>);
};
