import Button, { ButtonTypes } from '@/components/buttons/Button';
import QuizOption from '@/components/quiz/QuizOption';
import QuizOptions from '@/components/quiz/QuizOptions';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import Axios from 'axios';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface Question {
  text: string;
  image?: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  rightAnswer: number;
}

interface QuizState {
  loading: boolean;
  counter: number;
  questions?: Question[];
}

const question = `La infracción de Tránsito y seguridad vial siguiente: "Estacionarse en zona prohibida o eje preferencial" será sancionada con una multa de:`;
const image = `https://images.vexels.com/media/users/3/143473/isolated/preview/6a4a5a7dd733d452adfd328c32f50d3e-icono-de-se--al-de-stop-mano-by-vexels.png`;
const options = ['¢300.00 o $34.29', '¢100.00 o $11.43', '¢25.00 o $2.86', '¢500.00 o $57.14'];

export default class QuizScreen extends Component {
  state: QuizState = { loading: true, counter: 0 };

  get currentQuestion() {
    return this.state.questions![this.state.counter];
  }

  async componentDidMount() {
    try {
      const response = await Axios.get('/quiz/free', { params: { limit: 5 } });
      const quiz = response.data.data;

      this.setState({ questions: quiz, loading: false });
    } catch (err) {
      console.log(err);
    }
  }

  renderQuestion = () => {
    if (this.state.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00848C" />
          <Text style={styles.loadingText}>Cargando siguiente pregunta</Text>
        </View>
      );
    } else {
      return (
        <ScrollView>
          <QuizQuestion
            questionIndex={this.state.counter}
            questionText={this.currentQuestion.text}
            questionImage={this.currentQuestion.image}
          />
          <QuizOptions
            answers={[
              this.currentQuestion.answer1,
              this.currentQuestion.answer2,
              this.currentQuestion.answer3,
              this.currentQuestion.answer4,
            ]}
            questionHasImage={!!this.currentQuestion.image}
          />
        </ScrollView>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderQuestion()}
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

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
  },
});
