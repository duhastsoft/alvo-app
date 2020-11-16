import React from 'react';
import {ActivityIndicator, View, StyleSheet, SafeAreaView, Text} from 'react-native';

interface LoadingProps{
    text: string;
}

export default function LoadingComponent(props: LoadingProps){
    return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00848C" />
            <Text style={styles.loadingText}>{props.text}</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        },

        loadingText: {
        marginTop: 12,
        fontSize: 14,
        }
});