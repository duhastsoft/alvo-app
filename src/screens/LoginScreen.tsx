import AlvoLogo from '@/assets/logo.png';
import Button, { ButtonTypes } from '@/components/buttons/Button';
import CustomInput from '@/components/inputs/Input';
import Axios from 'axios';
import React, { Component } from 'react';
import { Image, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface LoginState {
  username: string;
  password: string;
  loading: boolean;
  errors: {
    username?: string;
    password?: string;
    general?: string;
  };
}

export default class LoginScreen extends Component<{}, LoginState> {
  state: LoginState = {
    username: '',
    password: '',
    loading: false,
    errors: { username: '', password: '' },
  };

  usernameChangeHandler = (value: string) => {
    this.setState({ username: value });
  };

  passwordChangeHandler = (value: string) => {
    this.setState({ password: value });
  };

  validateForm = (): boolean => {
    const { username, password } = this.state;
    let valid = true;
    const errors = { username: '', password: '' };
    if (!username.trim()) {
      errors.username = 'Campo requerido';
      valid = false;
    } else if (username.trim().length < 5) {
      errors.username = 'Al menos 5 caracteres';
      valid = false;
    }

    if (!password.trim()) {
      errors.password = 'Campo requerido';
      valid = false;
    } else if (password.trim().length < 8) {
      errors.password = 'Al menos 8 caracteres';
      valid = false;
    }
    this.setState({ errors });
    return valid;
  };

  loginHandler = async () => {
    this.setState((prevState) => ({ ...prevState, loading: true }));
    const isFormValid = this.validateForm();
    const errors = { username: '', password: '', general: '' };

    try {
      if (isFormValid) {
        const token = await Axios.post('/login', {
          account: this.state.username,
          password: this.state.password,
        });
        console.log(token);
      }
    } catch (err) {
      const responseErrors: { param: string; message: string }[] = err.response.data.errors;
      const otherError = err.response.data.message;

      responseErrors?.forEach((error) => {
        if (error.param === 'account') errors.username = error.message;
        if (error.param === 'password') errors.password = error.message;
      });

      if (otherError) errors.general = otherError;
      this.setState((prevState) => ({ ...prevState, errors }));
    }
    this.setState((prevState) => ({ ...prevState, loading: false }));
  };

  render() {
    const { username, password, errors } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image source={AlvoLogo} style={styles.logo} resizeMode="contain" />
        </View>
        <CustomInput
          placeholder="Usuario o correo"
          onChangeText={this.usernameChangeHandler}
          value={username}
          error={errors.username}
        />
        <CustomInput
          placeholder="Contraseña"
          password
          onChangeText={this.passwordChangeHandler}
          value={password}
          error={errors.password}
        />
        <Button
          title="Iniciar sesión"
          type={ButtonTypes.PRIMARY}
          style={{ width: '100%' }}
          onPressEvent={this.loginHandler}
          loading={this.state.loading}
        />
        {errors.general ? <Text style={styles.textError}>{errors.general}</Text> : null}
        <Text style={styles.textNormal}>¿No tienes una cuenta? Regístrate</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    paddingBottom: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
  },

  logoContainer: {
    flexDirection: 'row',
    width: '80%',
    marginBottom: 32,
  },

  logo: {
    flex: 1,
    aspectRatio: 3.53,
  },

  textError: {
    color: 'red',
    marginTop: 8,
    fontSize: 12,
  },

  textNormal: {
    color: '#a5a5a5',
    marginTop: 12,
  },
});
