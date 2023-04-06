import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState, useRef, useCallback} from 'react';
import {Alert} from 'react-native';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';

import {RootStackParamList} from '../../App';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export default ({navigation}: SignInScreenProps) => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const canGoNext = !email || !pw;
  const emailRef = useRef<TextInput | null>(null); // generic
  const pwRef = useRef<TextInput | null>(null);

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      Alert.alert('알림', '이메일을 입력해주세요');
      return;
    }
    if (!pw || !pw.trim()) {
      Alert.alert('알림', '비밀번호를 입력해주세요');
      return;
    }
    Alert.alert('알림', `${email}님 환영합니다`);
    setEmail('');
    setPw('');
  }, [email, pw]);

  const onSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.inputWrap]}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          placeholder="이메일을 입력해주세요"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          importantForAutofill="yes" // 안드로이드 자동완성
          autoComplete="email" // 자동완성
          textContentType="emailAddress" // ios 자동완성
          returnKeyType="next"
          blurOnSubmit={false} // 키보드 내려가는거 막음
          clearButtonMode="while-editing" // ios 전체삭제
          ref={emailRef}
          onSubmitEditing={() => {
            console.log('onSubmitEditing');
            pwRef.current?.focus();
          }}
        />
      </View>
      <View style={[styles.row, styles.inputWrap]}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호를 입력해주세요"
          value={pw}
          onChangeText={setPw}
          style={styles.input}
          secureTextEntry
          autoComplete="password"
          textContentType="password"
          returnKeyType="next"
          ref={pwRef}
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={[styles.row, styles.btns]}>
        <Pressable
          onPress={onSubmit}
          style={[
            styles.center,
            styles.btn,
            canGoNext ? styles.inActive : styles.active,
          ]}
          disabled={canGoNext}>
          <Text style={styles.btnTitle}>로그인</Text>
        </Pressable>
        <Pressable onPress={onSignUp} style={[styles.center, styles.btn]}>
          <Text style={styles.label}>회원가입하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 20},
  center: {justifyContent: 'center', alignItems: 'center'},
  btn: {paddingVertical: 10, borderRadius: 5, marginBottom: 5, flex: 1},
  row: {flexDirection: 'row', alignItems: 'center'},
  inActive: {backgroundColor: 'gray'},
  btns: {paddingTop: 10},
  active: {backgroundColor: 'royalblue'},
  btnTitle: {color: 'white', fontWeight: 'bold'},
  label: {fontWeight: 'bold', fontSize: 16, flex: 1, color: 'gray'},
  inputWrap: {marginVertical: 5},
  input: {
    padding: 0,
    paddingHorizontal: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 4,
    color: 'black',
  },
});
