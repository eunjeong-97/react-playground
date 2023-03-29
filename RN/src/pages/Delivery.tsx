import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Ing from 'pages/Ing';
import Complete from 'pages/Complete';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    // 지도는 로딩시간이 오래걸리고 메모리도 많이 잡아먹기 때문에 다시 불러오지 않기 위해
    // 스택으로 쌓았다가 제거하는 식으로 구현한다
    <Stack.Navigator initialRouteName="Ing">
      <Stack.Screen name="Ing" component={Ing} options={{headerShown: false}} />
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
