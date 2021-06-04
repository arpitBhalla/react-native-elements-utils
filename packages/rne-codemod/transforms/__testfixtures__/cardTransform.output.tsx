import React from 'react';
import { Text } from 'react-native-elements';

const App = () => {
  return (
    <>
      <Text variant="h1" />
      <Text variant="h1">My Text</Text>
      <Text variant="h2">My Text</Text>
      <Text variant="h3">My Text</Text>
      <Text variant="h4">My Text</Text>
      <Text style={{ h1: { color: 'blue' } }}>My Text</Text>
      <Text style={{ h2: { color: 'blue' } }}>My Text</Text>
      <Text style={{ h3: { color: 'blue' } }}>My Text</Text>
      <Text style={{ h4: { color: 'blue' } }}>My Text</Text>
      <Text variant="h4" style={{ h4: { color: 'blue' } }}>
        My Text
      </Text>
      <Text
        variant="h4"
        style={{ backgroundColor: 'blue', h4: { color: 'blue' } }}
      >
        My Text
      </Text>
    </>
  );
};
