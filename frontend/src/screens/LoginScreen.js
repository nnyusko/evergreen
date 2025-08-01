import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import authService from '../services/authService';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const userData = { email, password };
      const response = await authService.login(userData);
      console.log('Login successful:', response);
      await login(response.data); // Update auth context
      Alert.alert('로그인 성공', '환영합니다!');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      Alert.alert('로그인 실패', error.response?.data?.message || '로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="로그인" onPress={handleLogin} />
      <Button
        title="회원가입"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default LoginScreen;
