import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, Pressable, StyleSheet, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Delivery from 'pages/Delivery';
import Orders from 'pages/Orders';
import Settings from 'pages/Settings';

import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const {width: WINDOW_WIDTH} = Dimensions.get('window');

const Dialog = ({show}: {show: boolean}) => {
  if (!show) return null;
  return (
    <View style={[styles.tp, StyleSheet.absoluteFillObject]}>
      <View style={styles.modal}>
        <View style={styles.contents}>
          <Text>본문</Text>
          <View style={styles.band}>
            <Text style={styles.title}>Relative</Text>
          </View>
        </View>
        <View style={styles.btnsWrap}>
          <Pressable style={styles.btn}>
            <Text style={styles.title}>YES</Text>
          </Pressable>
          <Pressable style={[styles.btn, {backgroundColor: 'royalblue'}]}>
            <Text style={styles.title}> NO</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tp: {backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center'},
  modal: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'wheat',
    height: 300,
    width: WINDOW_WIDTH - 100,
    alignSelf: 'center',
  },
  contents: {flex: 1, backgroundColor: 'white'},
  band: {position: 'relative', top: 20, backgroundColor: 'tomato'},
  title: {color: 'white', textAlign: 'center'},
  btnsWrap: {flexDirection: 'row', height: 50},
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
  },
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [dialog, setDialog] = useState(false);
  return (
    <NavigationContainer>
      {isLogin ? (
        <Tab.Navigator>
          {/* <Tab.Group> */}
          <Tab.Screen
            name="Orders"
            component={Orders}
            options={{title: '오더목록'}}
          />
          <Tab.Screen
            name="Delivery"
            component={Delivery}
            options={{headerShown: false}}
          />
          {/* </Tab.Group> */}
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{title: '내 설정'}}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{title: '로그인'}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          />
        </Stack.Navigator>
      )}
      <Dialog show={dialog} />
    </NavigationContainer>
  );
}

export default App;
