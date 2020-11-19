import Button, { ButtonTypes } from '@/components/buttons/Button';
import QuizOptions from '@/components/quiz/QuizOptions';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import { RootStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface Question {
  id: number;
  text: string;
  image?: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  rightAnswer: number;
  requiresOrder: boolean;
}

interface ExamQuestion {
  id: number;
  selectedAnswer: number;
  rightAnswer: number;
}

interface QuizState {
  loading: boolean;
  counter: number;
  correctAnswers: number;
  selectedIndex: number;
  selectedAnswer: number;
  answerConfirmed: boolean;
  userToken: string;
  questions: Question[];
  exam: ExamQuestion[];
  startTime?: Date;
  endTime?: Date;
  submittingExam: boolean;
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
    userToken: '',
    questions: [],
    exam: [],
    submittingExam: false,
  };

  get currentQuestion() {
    return this.state.questions[this.state.counter];
  }

  async componentDidMount() {
    try {
      const { params } = this.props.route;
      const url = `/quiz/${params.type}`;
      const response = await Axios.get(url, {
        params: { limit: params.limit, category: params.category },
      });
      const quiz = response.data.data;

      const userToken = (await SecureStore.getItemAsync('token')) || '';

      this.setState({ questions: quiz, loading: false, userToken, startTime: new Date() });
    } catch (err) {
      console.log(err);
    }
  }

  onAnswerPressHandler = (index: number, answer: number) => {
    if (!this.state.answerConfirmed) {
      this.setState({ selectedIndex: index, selectedAnswer: answer });
    }
  };

  submitExamResult = async (lastQuestion: ExamQuestion) => {
    const { userToken } = this.state;
    if (userToken) {
      try {
        const { exam, startTime } = this.state;
        const { type, category } = this.props.route.params;
        await Axios.post(
          '/quiz',
          {
            startTime,
            category,
            examType: type,
            endTime: new Date(),
            questions: [...exam, lastQuestion],
          },
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
      } catch (error) {
        throw error;
      }
    }
  };

  nextQuestionHandler = () => {
    if (this.state.answerConfirmed) {
      const { navigation } = this.props;
      const { questions, selectedAnswer, counter, correctAnswers } = this.state;
      const { rightAnswer } = questions[counter];

      const newCorrectAnswers = correctAnswers + (rightAnswer === selectedAnswer ? 1 : 0);
      const currentExamQuestion = { id: questions[counter].id, selectedAnswer, rightAnswer };

      this.setState((prevState) => ({
        counter: prevState.counter + (counter < questions.length - 1 ? 1 : 0),
        selectedAnswer: -1,
        selectedIndex: -1,
        answerConfirmed: false,
        correctAnswers: newCorrectAnswers,
        exam: [...prevState.exam, currentExamQuestion],
      }));

      if (counter === questions.length - 1) {
        this.setState((prevState) => ({ ...prevState, submittingExam: true }));

        const score = (newCorrectAnswers / questions.length) * 10;

        this.submitExamResult(currentExamQuestion)
          .then()
          .catch((err) => {
            const { message } = err.response.data;
            console.error('Could not submit exam:', message);
          })
          .finally(() => {
            navigation.replace('Results', {
              score,
              correctAnswers: newCorrectAnswers,
              numberQuestions: questions.length,
            });
          });
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
    } else if (this.state.submittingExam) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00848C" />
          <Text style={styles.loadingText}>Calculando su resultado...</Text>
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
          onPressEvent={!this.state.submittingExam ? this.nextQuestionHandler : undefined}
          loading={this.state.submittingExam}
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
