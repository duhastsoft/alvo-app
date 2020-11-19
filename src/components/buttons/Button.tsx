import constants from '@/constants';
import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export enum ButtonTypes {
  PRIMARY,
  YELLOW,
}

export interface ButtonProps {
  title: string;
  onPressEvent?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  type?: ButtonTypes;
  loading?: boolean;
}

export default function Button(props: ButtonProps) {
  let buttonType = styles.buttonDefault;
  let buttonTextType = styles.buttonTextDefault;
  let indicatorColor = '#333';
  switch (props.type) {
    case ButtonTypes.PRIMARY:
      buttonType = styles.buttonPrimary;
      buttonTextType = styles.buttonTextPrimary;
      indicatorColor = '#fff';
      break;
    case ButtonTypes.YELLOW:
      buttonType = styles.buttonYellow;
      buttonTextType = styles.buttonTextYellow;
      indicatorColor = '#fff';
      break;
  }

  return (
    <TouchableOpacity
      onPress={props.onPressEvent}
      style={[styles.button, buttonType, props.style]}
      activeOpacity={0.9}
    >
      {props.loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={[styles.buttonText, buttonTextType, props.textStyle]}>{props.title}</Text>
      )}
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
    ...constants.styles.iosElevation4,
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
    backgroundColor: constants.colors.darkCyan,
  },

  buttonYellow: {
    backgroundColor: constants.colors.tangerineYellow,
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
