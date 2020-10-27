import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface QuizOptionProps {
  answerNumber?: number;
  answerIndex: number;
  answerText: string;
}

export default function QuizOption(props: QuizOptionProps) {
  const asciiCodeA = 'A'.charCodeAt(0);
  const optionLetter = String.fromCharCode(asciiCodeA + props.answerIndex);
  return (
    <View style={styles.container}>
      <Text style={styles.optionLetter}>{optionLetter}</Text>
      <Text style={styles.optionText}>{props.answerText}</Text>
    </View>
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

  optionLetter: {
    color: '#00848C',
    fontSize: 20,
    marginLeft: 8,
  },

  optionText: {
    fontSize: 20,
    marginLeft: 16,
  },
});
