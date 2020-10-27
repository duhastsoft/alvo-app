import Button, { ButtonTypes } from '@/components/buttons/Button';
import QuizOption from '@/components/quiz/QuizOption';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
const image = `https://images.vexels.com/media/users/3/143473/isolated/preview/6a4a5a7dd733d452adfd328c32f50d3e-icono-de-se--al-de-stop-mano-by-vexels.png`;
const options = ['¢300.00 o $34.29', '¢100.00 o $11.43', '¢25.00 o $2.86', '¢500.00 o $57.14'];

export default class QuizScreen extends Component {
  state: QuizState = { counter: 0 };

  componentDidUpdate() {}

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <QuizQuestion
            questionIndex={this.state.counter}
            questionText={question}
            questionImage={image}
          />
          <View style={{ flex: 1, marginTop: image ? 8 : 24 }}>
            {options.map((option, index) => (
              <QuizOption key={`option${index}`} answerIndex={index} answerText={option} />
            ))}
          </View>
        </ScrollView>
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
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});
