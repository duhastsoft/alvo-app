import Button, { ButtonTypes } from '@/components/buttons/Button';
import QuizOption from '@/components/quiz/QuizOption';
import QuizQuestion from '@/components/quiz/QuizQuestions';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Question {
  text: string;
  iamge?: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  rightAnswer: number;
}

interface QuizState {
  counter: number;
  questions?: Question[];
}

const question = `La infracción de Tránsito y seguridad vial siguiente: "Estacionarse en zona prohibida o eje preferencial" será sancionada con una multa de:`;
const options = ['¢300.00 o $34.29', '¢100.00 o $11.43', '¢25.00 o $2.86', '¢500.00 o $57.14'];

export default class QuizScreen extends Component {
  state: QuizState = { counter: 0 };

  render() {
    return (
      <View style={styles.container}>
        <QuizQuestion questionIndex={this.state.counter} questionText={question} />
        <View style={{ flex: 1, marginTop: 32 }}>
          {options.map((option, index) => (
            <QuizOption answerIndex={index} answerText={option} />
          ))}
        </View>
        <Button
          type={ButtonTypes.YELLOW}
          title="Siguiente"
          onPressEvent={() => alert('Pressed siguiente')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 16,
  },

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
