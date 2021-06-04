"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_elements_1 = require("react-native-elements");
var App = function () {
    return (<>
      <react_native_elements_1.Text h1 h2/>
      <react_native_elements_1.Text h1>My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text h2>My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text h3>My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text h4>My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text h1Style={{ color: 'blue' }}>My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text h2Style={{ color: 'blue' }}>My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text h3Style={{ color: 'blue' }}>My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text h4Style={{ color: 'blue' }}>My Text</react_native_elements_1.Text>
      <react_native_elements_1.Text h4 h4Style={{ color: 'blue' }}>
        My Text
      </react_native_elements_1.Text>
      <react_native_elements_1.Text h4 h4Style={{ color: 'blue' }} style={{ backgroundColor: 'blue' }}>
        My Text
      </react_native_elements_1.Text>
    </>);
};
