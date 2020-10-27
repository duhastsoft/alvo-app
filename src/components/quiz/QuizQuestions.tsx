import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface QuizQuestionProps {
  questionIndex: number;
  questionText: string;
}

export default function QuizQuestion(props: QuizQuestionProps) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.counter}>
        <Text style={{ color: '#fff', fontSize: 18 }}>{props.questionIndex + 1}</Text>
      </View>
      <Text style={[styles.questionText, { marginHorizontal: 16, flexWrap: 'wrap', flex: 1 }]}>
        {props.questionText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  counter: {
    backgroundColor: '#00848C',
    color: '#fff',
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
  },

  questionText: {
    fontSize: 20,
  },
});
