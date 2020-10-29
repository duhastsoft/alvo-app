import constants from '@/constants';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface QuizQuestionProps {
  questionIndex: number;
  questionText: string;
  questionImage?: string;
}

export default function QuizQuestion(props: QuizQuestionProps) {
  let image = null;
  if (props.questionImage) {
    image = QuizImage(props.questionImage);
  }

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.counter}>
          <Text style={styles.questionNumberText}>{props.questionIndex + 1}</Text>
        </View>
        <Text style={styles.questionText}>{props.questionText}</Text>
      </View>
      {image}
    </>
  );
}

function QuizImage(imageUri: string) {
  const MAX_SIZE = 120;
  let imageWidth = MAX_SIZE;
  let imageHeight = MAX_SIZE;
  Image.getSize(
    imageUri,
    (width, height) => {
      if (width <= MAX_SIZE && height <= MAX_SIZE) {
        imageWidth = width;
        imageHeight = height;
      }
    },
    () => {
      imageWidth = MAX_SIZE;
      imageHeight = MAX_SIZE;
    }
  );

  return (
    <Image
      source={{ uri: imageUri }}
      style={{
        width: imageWidth,
        height: imageHeight,
        marginTop: 8,
        alignSelf: 'center',
      }}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  counter: {
    backgroundColor: constants.colors.darkCyan,
    color: '#fff',
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },

  questionNumberText: {
    fontSize: 16,
    color: '#fff',
  },

  questionText: {
    fontSize: 20,
    marginHorizontal: 16,
    flexWrap: 'wrap',
    flex: 1,
  },
});
