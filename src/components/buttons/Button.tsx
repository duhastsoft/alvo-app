import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

export enum ButtonTypes {
  PRIMARY,
  YELLOW,
}

export interface ButtonProps {
  onPressEvent: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  type?: ButtonTypes;
}

export default function Button(props: ButtonProps) {
  let buttonType = styles.buttonDefault;
  let buttonTextType = styles.buttonTextDefault;
  switch (props.type) {
    case ButtonTypes.PRIMARY:
      buttonType = styles.buttonPrimary;
      buttonTextType = styles.buttonTextPrimary;
      break;
    case ButtonTypes.YELLOW:
      buttonType = styles.buttonYellow;
      buttonTextType = styles.buttonTextYellow;
      break;
  }

  return (
    <TouchableOpacity
      onPress={props.onPressEvent}
      style={[styles.button, buttonType, props.style]}
      activeOpacity={0.9}
    >
      <Text style={[styles.buttonText, buttonTextType, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginVertical: 8,
    elevation: 4,
  },

  buttonText: {
    textTransform: 'uppercase',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  buttonDefault: {
    backgroundColor: '#fff',
  },

  buttonPrimary: {
    backgroundColor: '#00848c',
  },

  buttonYellow: {
    backgroundColor: '#fccf17',
  },

  buttonTextDefault: {
    color: '#333',
  },

  buttonTextPrimary: {
    color: '#fff',
  },

  buttonTextYellow: {
    color: '#fff',
  },
});
