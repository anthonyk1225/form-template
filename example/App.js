import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { constants, Form } from './form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Forgot Password</Text>
      <Form
        formType="forgotPassword"
        values={{
          [constants.forgotPassword.email.ref]: "jojo@speedwagon.com"
        }}
      />

      <Text>Change password</Text>
      <Form
        formType="changePassword"
      />

      <Text>Login</Text>
      <Form
        formType="login"
        values={{
          [constants.login.email.ref]: "jojo@speedwagon.com"
        }}
      />
    </View>
  );
}
