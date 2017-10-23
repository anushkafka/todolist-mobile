import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class TodoItem extends React.Component {
  render() {
    const containerStyles = [styles.container, this.props.completed ? styles.doneContainer : styles.undoneContainer];

    return (
      <View style={containerStyles}>
        <Text>{this.props.text}</Text>
        <View style={styles.buttonContainer}>
          {this.props.completed ? null : (
            <TouchableOpacity style={styles.button} onPress={this.props.onDone}>
              <Text>Done</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={this.props.onRemove}>
            <Text>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    padding: 5
  },
  undoneContainer: {
    backgroundColor: 'khaki'
  },
  doneContainer: {
    backgroundColor: 'lightseagreen'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    marginLeft: 10
  }
});
