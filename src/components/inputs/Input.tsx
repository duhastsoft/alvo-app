import React from 'react';
import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface InputProps {
  placeholder?: string;
  password?: boolean;
  style?: StyleProp<ViewStyle>;
  styleInput?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
  value?: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export default function Input(props: InputProps) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={[styles.input, props.styleInput, props.error ? styles.inputError : null]}
          placeholder={props.placeholder}
          secureTextEntry={props.password}
          keyboardType={props.keyboardType}
          autoCapitalize={props.autoCapitalize}
          onChangeText={props.onChangeText}
          value={props.value}
        />
      </View>
      {props.error?.trim() ? <Text style={styles.textError}>{props.error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    width: '100%',
  },

  input: {
    flex: 1,
    borderRadius: 10,
    borderColor: '#D5D5D5',
    borderWidth: 1,
    fontSize: 18,
    backgroundColor: 'white',
    minHeight: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  inputError: {
    borderColor: 'red',
  },

  textError: {
    color: 'red',
    marginTop: 8,
    paddingLeft: 8,
    fontSize: 12,
  },
});
