import React from "react";
import { Text } from "react-native-elements";

const App = () => {
  return (
    <>
      <Text h1={2 > 8} h2={4 < 1} />
      <Text h1>My Text</Text>
      <Text h2>My Text</Text>
      <Text h3>My Text</Text>
      <Text h4>My Text</Text>
      <Text h1Style={{ color: "blue" }}>My Text</Text>
      <Text h2Style={{ color: "blue" }}>My Text</Text>
      <Text h3Style={{ color: "blue" }}>My Text</Text>
      <Text h4Style={{ color: "blue" }}>My Text</Text>
      <Text h4 h4Style={{ color: "blue" }}>
        My Text
      </Text>
      <Text h4 h4Style={{ color: "blue" }} style={{ backgroundColor: "blue" }}>
        My Text
      </Text>
      <Text h4Style={{ color: "blue" }} h2Style={{ backgroundColor: "blue" }}>
        My Text
      </Text>
    </>
  );
};
