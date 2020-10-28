import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface QuizOptionProps {
  answerNumber?: number;
  answerIndex: number;
  answerText: string;
  correct: boolean;
  incorrect: boolean;
  selected: boolean;
  onPress?: () => void;
}

export default function QuizOption(props: QuizOptionProps) {
  const asciiCodeA = 'A'.charCodeAt(0);
  const optionLetter = String.fromCharCode(asciiCodeA + props.answerIndex);
  let containerStyle: object[] = [];
  let textStyle: object[] = [];

  if (props.selected) {
    containerStyle.push(styles.selected);
  }
  if (props.correct) {
    containerStyle.push(styles.correct);
    textStyle.push(styles.selectionConfirmedText);
  }
  if (props.incorrect) {
    containerStyle.push(styles.incorrect);
    textStyle.push(styles.selectionConfirmedText);
  }

  return (
    <TouchableOpacity
      style={[styles.container, ...containerStyle]}
      activeOpacity={0.9}
      onPress={props.onPress}
    >
      <Text
        style={[
          styles.optionLetter,
          { color: props.correct || props.incorrect ? '#000' : '#00848C' },
        ]}
      >
        {optionLetter}
      </Text>
      <Text style={[styles.optionText, textStyle]}>{props.answerText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 20,
  },

  selected: {
    backgroundColor: '#ddd',
  },

  correct: {
    backgroundColor: '#3FEF66',
  },

  incorrect: {
    backgroundColor: '#FF5858',
  },

  selectionConfirmedText: {
    color: '#fff',
  },

  optionLetter: {
    color: '#00848C',
    fontSize: 20,
    marginLeft: 8,
  },

  optionText: {
    fontSize: 20,
    marginLeft: 16,
    flex: 1,
    color: '#000',
  },
});
