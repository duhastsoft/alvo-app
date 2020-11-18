import AlvoLogo from '@/assets/logo.png';
import Button, { ButtonTypes } from '@/components/buttons/Button';
import Input from '@/components/inputs/Input';
import { RootStackParamList } from '@/types';
import { rules, validateField } from '@/validation';
import { StackNavigationProp } from '@react-navigation/stack';
import Axios from 'axios';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

interface RegisterState {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  firstnameError: string;
  lastnameError: string;
  emailError: string;
  usernameError: string;
  passwordError: string;
  passwordConfirmError: string;
  loading: boolean;
}

interface RegisterProps {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
}

export default class RegisterScreen extends Component<RegisterProps, RegisterState> {
  state: RegisterState = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    firstnameError: '',
    lastnameError: '',
    emailError: '',
    usernameError: '',
    passwordError: '',
    passwordConfirmError: '',
    loading: false,
  };

  textChangeHandler = (key: keyof RegisterState) => (value: string) => {
    this.setState((prevState) => ({ ...prevState, [key]: value }));
  };

  validate = () => {
    const { state } = this;
    const firstnameError = validateField(rules.notEmpty, rules.minLength(2))(state.firstname);
    const lastnameError = validateField(rules.notEmpty, rules.minLength(3))(state.lastname);
    const usernameError = validateField(
      rules.notEmpty,
      rules.alphanumeric,
      rules.minLength(5)
    )(state.username);
    const emailError = validateField(rules.notEmpty, rules.email)(state.email);
    const passwordError = validateField(rules.notEmpty, rules.minLength(8))(state.password);
    const passwordConfirmError = validateField(
      rules.notEmpty,
      rules.passwordMatch(state.password)
    )(state.passwordConfirm);

    this.setState((prevState) => ({
      ...prevState,
      firstnameError,
      lastnameError,
      usernameError,
      emailError,
      passwordError,
      passwordConfirmError,
    }));

    return (
      !firstnameError &&
      !lastnameError &&
      !usernameError &&
      !emailError &&
      !passwordError &&
      !passwordConfirmError
    );
  };

  submitRegisterHandler = async () => {
    this.setState((prevState) => ({ ...prevState, loading: true }));
    try {
      if (this.validate()) {
        const { firstname, lastname, email, username, passwordConfirm } = this.state;
        await Axios.post('/register', {
          firstname,
          lastname,
          email,
          account: username,
          password: passwordConfirm,
          role: 'Customer',
        });
        alert('Su cuenta fue creada. Inicie sesión con ella.');
        this.props.navigation.pop();
      }
    } catch (err) {
      const otherError: string | undefined = err.response.data.message;

      console.error(otherError);
      alert(
        `Ocurrió un problema al intentar crear su cuenta. Intente más tarde. Detalle: ${otherError}`
      );
    }
    this.setState((prevState) => ({ ...prevState, loading: false }));
  };

  render() {
    const state = this.state;
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image source={AlvoLogo} style={styles.logo} resizeMode="contain" />
        </View>
        <Input
          placeholder="Nombre"
          value={state.firstname}
          error={state.firstnameError}
          onChangeText={this.textChangeHandler('firstname')}
        />
        <Input
          placeholder="Apellido"
          value={state.lastname}
          error={state.lastnameError}
          onChangeText={this.textChangeHandler('lastname')}
        />
        <Input
          placeholder="Correo electrónico"
          value={state.email}
          error={state.emailError}
          autoCapitalize="none"
          onChangeText={this.textChangeHandler('email')}
          keyboardType="email-address"
        />
        <Input
          placeholder="Usuario"
          value={state.username}
          error={state.usernameError}
          onChangeText={this.textChangeHandler('username')}
        />
        <Input
          placeholder="Contraseña"
          value={state.password}
          error={state.passwordError}
          onChangeText={this.textChangeHandler('password')}
          password
        />
        <Input
          placeholder="Confirmar contraseña"
          value={state.passwordConfirm}
          error={state.passwordConfirmError}
          onChangeText={this.textChangeHandler('passwordConfirm')}
          password
        />
        <Button
          title="Iniciar sesión"
          type={ButtonTypes.PRIMARY}
          style={{ width: '100%' }}
          onPressEvent={this.submitRegisterHandler}
          loading={state.loading}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    alignItems: 'center',
    padding: 40,
    paddingBottom: 16,
    backgroundColor: 'white',
  },

  logoContainer: {
    flexDirection: 'row',
    width: '50%',
    marginBottom: 32,
  },

  logo: {
    flex: 1,
    aspectRatio: 3.53,
  },
});
