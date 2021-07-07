import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import QuizOption from './QuizOption';

interface QuizOptionsProps {
  questionNumber: number;
  answers: string[];
  questionHasImage: boolean;
  selectedOption: number;
  confirmed: boolean;
  shouldShuffle: boolean;
  rightAnswer: number;
  onSelect: (index: number, answer: number) => void;
}

export default function QuizOptions(props: QuizOptionsProps) {
  const [shuffledIndexes, setShuffledIndexes] = useState(Array<number>());
  useEffect(() => {
    if (props.shouldShuffle) {
      setShuffledIndexes(shuffleAnswers([1, 2, 3, 4]));
    } else setShuffledIndexes([1, 2, 3, 4]);
  }, [props.questionNumber]);

  return (
    <View style={{ flex: 1, marginTop: props.questionHasImage ? 8 : 24 }}>
      {shuffledIndexes.map((position, index) => {
        return (
          <QuizOption
            key={`option${index}`}
            answerNumber={position}
            answerIndex={index}
            answerText={props.answers[position - 1]}
            selected={props.selectedOption === index}
            correct={props.confirmed && props.rightAnswer === position}
            incorrect={
              props.confirmed && props.selectedOption === index && props.rightAnswer !== position
            }
            onPress={() => props.onSelect(index, position)}
          />
        );
      })}
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
