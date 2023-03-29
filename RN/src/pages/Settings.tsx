import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';

export default () => {
  const [count, setCount] = useState(1);
  return (
    <View style={{flex: 1}}>
      <Text>Settings</Text>
      <Pressable onPress={() => setCount(p => p + 1)}>
        <Text>{count}</Text>
      </Pressable>
    </View>
  );
};
