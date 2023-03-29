import React, {useState, useRef} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';

export default () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const canGoNext = !email || !pw;

  
  const onSubmit = () => {
    console.log('로그인완료', {email, pw});
  };
  const onSignUp = () => {};
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.inputWrap]}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          placeholder="이메일을 입력해주세요"
          onChangeText={setEmail}
          style={styles.input}
          importantForAutofill="yes" // 안드로이드 자동완성
          autoComplete="email" // 자동완성
          textContentType="emailAddress" // ios 자동완성
          ref={emailRef}
          onSubmitEditing={() => console.log('onSubmitEditing')}
        />
      </View>
      <View style={[styles.row, styles.inputWrap]}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호를 입력해주세요"
          onChangeText={setPw}
          style={styles.input}
          secureTextEntry
          autoComplete="password"
          textContentType="password"
          ref={pwRef}
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
          <Text>회원가입하기</Text>
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
  label: {fontWeight: 'bold', fontSize: 16, flex: 1},
  inputWrap: {marginVertical: 5},
  input: {
    padding: 0,
    paddingHorizontal: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 4,
  },
});
