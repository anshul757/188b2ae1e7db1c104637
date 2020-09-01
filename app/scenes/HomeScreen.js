import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.navigate('Detail');
          }}>
          <Text>Homescreen</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default HomeScreen;
