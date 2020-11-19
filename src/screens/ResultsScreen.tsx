import Button, { ButtonTypes } from '@/components/buttons/Button';
import constants from '@/constants';
import { RootStackParamList } from '@/types';
import { Link, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import React, { Component } from 'react';
import { ActivityIndicator, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import GradesChart from '../components/charts/GradesChart';
import Chip from '@/components/buttons/ChipTextOnly';


interface ExamRecord {
  startTime: Date;
  grade: string;
  examType: 'free' | 'vmt' | 'category';
  category?: number;
}

interface ResultProps {
  navigation: StackNavigationProp<RootStackParamList, 'Results'>;
  route: RouteProp<RootStackParamList, 'Results'>;
}

interface ResultsState {
  examHistory: ExamRecord[];
  loading: boolean;
  userToken: string;
}
export default class ResultsScreen extends Component<ResultProps, ResultsState> {
  state: ResultsState = {
    examHistory: [],
    loading: true,
    userToken: '',
  };

  async componentDidMount() {
    let userToken: string = '';
    try {
      userToken = (await SecureStore.getItemAsync('token')) || '';
      if (userToken) {
        const response = await Axios.get('/quiz/history', {
          params: { limit: 5 },
          headers: { Authorization: `Bearer ${userToken}` },
        });
        const examHistory = response.data.data;
        this.setState((prevState) => ({ ...prevState, examHistory }));
      }
    } catch (error) {
      console.error(error.response.data);
    } finally {
      this.setState((prevState) => ({ ...prevState, loading: false, userToken }));
    }
  }

  get resultMessage() {
    const { params } = this.props.route;
    if (params.score && params.score <= 5) return '¡Anímate! Sigue practicando';
    else if (params.score && params.score <= 7) return '¡Puedes mejorar esa nota!';
    else return '¡Lo hiciste muy bien!';
  }

  get chartLabels() {
    return this.state.examHistory.map((_, index) => `${index + 1}`);
  }

  get chartScores() {
    return this.state.examHistory.map((exam) => parseFloat(exam.grade));
  }

  getExamType({ examType, category }: ExamRecord) {
    if (examType === 'category') {
      switch (category) {
        case 1:
          return 'Ley de transporte';
        case 2:
          return 'Reglamento General';
        case 3:
          return 'Señalización';
        default:
          return 'Categoría desconocida';
      }
    } else if (examType === 'free') {
      return 'Prueba Libre';
    } else {
      return 'Simulación VMT';
    }
  }

  renderResult = () => {
    const { score, numberQuestions, correctAnswers } = this.props.route.params;
    return score && numberQuestions && correctAnswers ? (
      <>
        <Text style={styles.title}>Tu puntación:</Text>

        <Text style={styles.scoreText}>{score?.toFixed(1)}</Text>

        <Text
          style={styles.subtitle}
        >{`${correctAnswers}/${numberQuestions} respuestas correctas`}</Text>

        <Text style={{ marginBottom: 24 }}>{this.resultMessage}</Text>
      </>
    ) : null;
  };

  renderAlternativeMessage = () => {
    return this.state.loading ? (
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator size="large" color={constants.colors.darkCyan} />
        <Text style={styles.textNormal}>Cargando el historial</Text>
      </View>
    ) : (
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textNormal}>Si quieres ver un historial de tus resultados</Text>
          <Link to="/Login" style={styles.textLink}>
            Inicia sesión con tu cuenta
        </Link>
        </View>
      );
  };

  renderChart = () => {
    return this.state.examHistory.length > 0 ? (
      <>
        <Text style={styles.chartTitle}>Tus últimos resultados:</Text>
        <GradesChart labels={this.chartLabels} data={this.chartScores.reverse()} />
      </>
    ) : (
        this.renderAlternativeMessage()
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {this.renderResult()}
          {this.renderChart()}
          <View style={{flexDirection:'column'}}>
          {this.state.examHistory.map((exam) => (
             <TouchableOpacity
             style={styles.card}
             onPress={() => {
             }}
             activeOpacity={0.8}
           >
             <View style={styles.cardContent}>
             <Text style={styles.cardTitle}>{this.getExamType(exam)}</Text>
             <Chip name={parseFloat(exam.grade).toFixed(2)}/>
             </View>
           </TouchableOpacity>
          ))}
        </View>
        </ScrollView>
        <Button
          type={ButtonTypes.YELLOW}
          title={'Continuar'}
          onPressEvent={() => this.props.navigation.pop()}
          style={{ width: '100%', paddingHorizontal: 16 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scroll: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 72,
    color: 'orange',
    padding: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 32,
  },
  subtitle: {
    fontSize: 18,
    margin: 15,
  },

  textNormal: {
    fontSize: 16,
  },

  textLink: {
    fontSize: 16,
    color: constants.colors.darkCyan,
  },

  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop:12
  },
  cardContent: {
    color: '#00848c',
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical:10,
    justifyContent:'space-between'
  },
card: {
  backgroundColor: 'white',
  marginBottom:14
},
cardTitle: {
  color: '#00848c',
  fontSize: 16,
  paddingHorizontal: 4,

},
});
