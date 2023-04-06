import React, {useCallback, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import VerEx from 'verbal-expressions';

import {RootStackParamList} from '../../App';

type SignUpSreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export default ({navigation}: SignUpSreenProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pw, setPw] = useState('');
  const canGoNext = !email || !name || !pw;
  const emailRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const pwRef = useRef<TextInput | null>(null);

  // 이렇게 만들고 시작
  // const 정규식 = VerEx().startOfLine().endOfLine();
  // const 핸드폰번호정규식 = VerEx()
  //   .startOfLine() // 시작
  //   .range('0', '9') // 0부터9까지 숫자만 허용
  //   .repeatPrevious(3) // 3자리
  //   .maybe('-') // '-'기호가 올수도 있고 안올수도 있고
  //   // .repeatPrevious(3, 4) // 3자리~4자리
  //   .repeatPrevious(4) // 4자리
  //   .endOfLine(); // 끝
  // console.log({핸드폰번호정규식});
  // console.log(핸드폰번호정규식.test('010-3369-0594'));

  const onSignUp = useCallback(() => {}, [email, name, pw]);
  return (
    // <KeyboardAvoidingView behavior="position">
    <KeyboardAvoidingView ehavior="position" style={styles.container}>
      <View style={[styles.row, styles.inputWrap]}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          placeholder="이메일을 입력해주세요"
          value={email}
          onChangeText={setEmail}
          ref={emailRef}
          onSubmitEditing={() => nameRef.current?.focus()}
          style={styles.input}
          importantForAutofill="yes" // aos 자동완성
          textContentType="emailAddress" // ios 자동완성
          autoComplete="email" // 자동완성
          blurOnSubmit={false} // 키보드자판 안내려감
          clearButtonMode="while-editing" // ios 전체삭제
          returnKeyType="next"
        />
      </View>
      <View style={[styles.row, styles.inputWrap]}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          placeholder="이름을 입력해주세요"
          value={name}
          onChangeText={setName}
          ref={nameRef}
          onSubmitEditing={() => pwRef.current?.focus()}
          style={styles.input}
          blurOnSubmit={false} // 키보드자판 안내려감
          importantForAutofill="yes" // aos 자동완성
          textContentType="name" // ios 자동완성
          autoComplete="name" // 자동완성
          returnKeyType="next"
          clearButtonMode="while-editing" // ios 전체삭제
        />
      </View>
      <View style={[styles.row, styles.inputWrap]}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
          value={pw}
          onChangeText={setPw}
          ref={pwRef}
          onSubmitEditing={onSignUp}
          style={styles.input}
          secureTextEntry
          autoComplete="password"
          textContentType="password"
          returnKeyType="next"
        />
      </View>
      <Pressable
        onPress={onSignUp}
        style={[styles.center, styles.btn, !canGoNext && styles.inActive]}
        disabled={canGoNext}>
        <Text style={styles.btnTitle}>로그인</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 20},
  center: {justifyContent: 'center', alignItems: 'center'},
  row: {flexDirection: 'row', alignItems: 'center'},
  inputWrap: {marginVertical: 5},
  label: {fontWeight: 'bold', fontSize: 16, flex: 1},
  input: {
    padding: 0,
    paddingHorizontal: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 4,
  },
  btn: {
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 10,
    backgroundColor: 'royalblue',
  },
  inActive: {backgroundColor: 'gray'},
  btnTitle: {fontWeight: 'bold', color: 'white'},
});
