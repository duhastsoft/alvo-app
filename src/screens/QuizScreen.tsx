import Button, { ButtonTypes } from '@/components/buttons/Button';
import QuizOptions from '@/components/quiz/QuizOptions';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import { RootStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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
  requiresOrder: boolean;
}

interface QuizState {
  loading: boolean;
  counter: number;
  correctAnswers: number;
  selectedIndex: number;
  selectedAnswer: number;
  answerConfirmed: boolean;
  questions?: Question[];
}

interface QuizProps {
  navigation: StackNavigationProp<RootStackParamList, 'Quiz'>;
  route: RouteProp<RootStackParamList, 'Quiz'>;
}

export default class QuizScreen extends Component<QuizProps, QuizState> {
  state: QuizState = {
    loading: true,
    counter: 0,
    correctAnswers: 0,
    selectedIndex: -1,
    selectedAnswer: -1,
    answerConfirmed: false,
  };

  get currentQuestion() {
    return this.state.questions![this.state.counter];
  }

  async componentDidMount() {
    try {
      const { params } = this.props.route;
      const url = `/quiz/${params.type}`;
      const response = await Axios.get(url, {
        params: { limit: params.limit, category: params.category },
      });
      const quiz = response.data.data;

      this.setState({ questions: quiz, loading: false });
    } catch (err) {
      console.log(err);
    }
  }

  onAnswerPressHandler = (index: number, answer: number) => {
    if (!this.state.answerConfirmed) {
      this.setState({ selectedIndex: index, selectedAnswer: answer });
    }
  };

  nextQuestionHandler = () => {
    const { navigation } = this.props;
    const { questions, selectedAnswer, counter } = this.state;
    if (this.state.answerConfirmed) {
      if (counter < this.state.questions!.length - 1) {
        if (questions![counter].rightAnswer === selectedAnswer) {
          this.setState((prev) => ({ correctAnswers: prev.correctAnswers + 1 }));
        }

        this.setState((prevState) => ({
          counter: prevState.counter + 1,
          selectedAnswer: -1,
          selectedIndex: -1,
          answerConfirmed: false,
        }));
      } else {
        const score = this.state.correctAnswers / this.state.questions!.length;
        navigation.replace('Results', {
          score,
          correctAnswers: this.state.correctAnswers,
          numberQuestions: this.state.questions!.length,
        });
        // console.log('score ', score);
        // console.log('correctanswers ', this.state.correctAnswers);
        // console.log('numberquestions', this.state.questions!.length);
        // alert('Examen finalizado');
      }
    } else if (this.state.selectedIndex != -1) {
      this.setState({ answerConfirmed: true });
    } else {
      alert('Selecciona una opción y luego confirma tu respuesta');
    }
  };

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
            confirmed={this.state.answerConfirmed}
            questionHasImage={!!this.currentQuestion.image}
            questionNumber={this.state.counter}
            rightAnswer={this.currentQuestion.rightAnswer}
            selectedOption={this.state.selectedIndex}
            shouldShuffle={!this.currentQuestion.requiresOrder}
            onSelect={this.onAnswerPressHandler}
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
          title={this.state.answerConfirmed ? 'Siguiente' : 'Confirmar respuesta'}
          onPressEvent={this.nextQuestionHandler}
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
