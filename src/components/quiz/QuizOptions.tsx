import React from 'react';
import { View } from 'react-native';
import QuizOption from './QuizOption';

interface QuizOptionsProps {
  answers: string[];
  questionHasImage: boolean;
}

export default function QuizOptions(props: QuizOptionsProps) {
  const shuffledIndexes = shuffleAnswers([0, 1, 2, 3]);

  return (
    <View style={{ flex: 1, marginTop: props.questionHasImage ? 8 : 24 }}>
      {shuffledIndexes.map((position, index) => (
        <QuizOption
          key={`option${index}`}
          answerNumber={position + 1}
          answerIndex={index}
          answerText={props.answers[position]}
        />
      ))}
    </View>
  );
}

function shuffleAnswers(answers: number[]) {
  var j, x, i;
  for (i = answers.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = answers[i];
    answers[i] = answers[j];
    answers[j] = x;
  }
  return answers;
}
