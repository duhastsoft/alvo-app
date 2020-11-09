import { Text, View, StyleSheet, Platform, StatusBar } from 'react-native';
import React, { Component } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';

interface ResultProps {
  navigator: StackNavigationProp<RootStackParamList, 'Results'>;
  route: RouteProp<RootStackParamList, 'Results'>;
}

export default class ResultsScreen extends Component<ResultProps> {
  get resultMessage() {
    const { params } = this.props.route;
    if (params.score <= 5) return '¡Anímate! Sigue practicando';
    else if (params.score <= 7) return '¡Puedes mejorar esa nota!';
    else return '¡Lo hiciste muy bien!';
  }

  render() {
    const { score, numberQuestions, correctAnswers } = this.props.route.params;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tu puntación:</Text>
        <Text style={styles.scoreText}>{score.toFixed(1)}</Text>
        <Text
          style={styles.subtitle}
        >{`${correctAnswers}/${numberQuestions} respuestas correctas`}</Text>
        <Text>{this.resultMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
});
