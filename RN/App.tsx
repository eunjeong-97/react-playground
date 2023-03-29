import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Text,
  TouchableHighlight,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useCallback} from 'react';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailsScreenProps = NativeStackScreenProps<ParamListBase, 'Details'>;

function HomeScreen({navigation, route}: HomeScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Details');
  }, [navigation]);

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'wheat',
        }}>
        <TouchableHighlight underlayColor="wheat" onPress={onClick}>
          <Text>TouchableHighlight</Text>
        </TouchableHighlight>
        <Pressable onPress={onClick}>
          <Text>Pressable</Text>
        </Pressable>
      </View>
      <View style={{backgroundColor: 'teal', flex: 1}}>
        <Text>두번째</Text>
      </View>
    </>
  );
}

function DetailsScreen({navigation}: DetailsScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableHighlight onPress={onClick}>
        <Text>Details Screen</Text>
      </TouchableHighlight>
    </View>
  );
}

const {width: WINDOW_WIDTH} = Dimensions.get('window');

// 페이지시작
const Stack = createNativeStackNavigator<RootStackParamList>();
function App() {
  return (
    <NavigationContainer>
      {/* 여기에 absolute View를 그리면 Stack.Navigator에 덮어씌워진다 */}
      <View style={{position: 'absolute'}}>
        <Text>모달창</Text>
      </View>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: '홈화면'}}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{title: '디테일화면'}}
        />
        {/* <Stack.Screen name="Details">
          {props => <DetailsScreen {...props} />}
        </Stack.Screen> */}
      </Stack.Navigator>
      {/* 하단의 컴포넌트가 최상단으로 보임 */}
      {/* absolute는 기존요소와 겹쳐보이도록 */}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.7)',
          // modal박스를 absolute주지 않고 상하중앙정렬
          justifyContent: 'center',
        }}>
        <View
          style={{
            // position: 'absolute',
            // top: 50,
            // bottom: 50,
            // left: 50,
            // right: 50,
            borderRadius: 20,
            padding: 20,
            backgroundColor: 'wheat',
            // absolute는 최대한 안쓰는게 좋기 때문에
            height: 300,
            width: WINDOW_WIDTH - 100,
            alignSelf: 'center',
            // 그림자효과
            shadowColor: 'black',
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: {width: 5, height: 5},
            elevation: 15,
          }}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <Text>본문</Text>
            <View
              style={{
                position: 'relative',
                top: 20,
                backgroundColor: 'tomato',
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                Relative
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              // 형제요소에 flex:1을 줬기 때문에 absolute는 필요없음
              // position: 'absolute',
              // bottom: 20,
              // left: 20,
            }}>
            <Pressable
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'tomato',
              }}>
              <Text style={{color: 'white'}}>YES</Text>
            </Pressable>
            <Pressable
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'royalblue',
              }}>
              <Text style={{color: 'white'}}> NO</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </NavigationContainer>
  );
}

export default App;
