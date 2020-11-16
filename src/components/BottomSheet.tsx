import React, { Component } from 'react';
import {
  Modal,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle
} from 'react-native';

import PropTypes from 'prop-types';

export interface BottomSheetProps{
  isVisible?: boolean;
  style?: StyleProp<ViewStyle>,
}

export default class BottomSheet extends Component<BottomSheetProps> {
  constructor(props:BottomSheetProps) {
    super(props);
  }

 

  render() {

    const {children } = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isVisible}
      >
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.modalView}>
            <View
             style={[styles.listContainer,this.props.style]}
            >
              {children}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' },
  modalView: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  listContainer: { backgroundColor: 'white' },
});
