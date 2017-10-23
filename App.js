import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TodoContainer from './containers/TodoContainer';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TodoContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
