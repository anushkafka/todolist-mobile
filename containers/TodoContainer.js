import React from 'react';
import { View, Text, ListView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import TodoItem from './../components/TodoItem';

import createTodoItem from './../utils/createTodoItem';

export default class TodoContainer extends React.Component {
  constructor() {
    super();

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    const todoItems = [
      createTodoItem('Remember to buy milk'),
      createTodoItem('Walk the dog'),
      createTodoItem('Charge laptop'),
      createTodoItem('Feed the cat')
    ];

    this.state = {
      todoItems: todoItems,
      dataSource: this.ds.cloneWithRows(todoItems),
      text: ''
    };
  }

  handleTextChange = text => {
    this.setState({ text });
  };

  constructDataSource = todoItems => {
    return this.ds.cloneWithRows(
      todoItems.sort((a, b) => {
        if (a.completed && !b.completed) {
          return 1;
        } else if (b.completed && !a.completed) {
          return -1;
        }

        return 0;
      })
    );
  };

  handleAddPress = () => {
    if (!this.state.text) {
      return;
    }

    const todoText = this.state.text;

    const newTodoItem = createTodoItem(todoText);

    const newTodoItems = this.state.todoItems.concat(newTodoItem);

    this.setState({
      todoItems: newTodoItems,
      dataSource: this.constructDataSource(newTodoItems),
      text: ''
    });
  };

  handleDone = doneItemId => {
    const newTodoItems = this.state.todoItems.map(item => {
      if (item.id === doneItemId) {
        return {
          ...item,
          completed: true
        };
      } else {
        return item;
      }
    });

    this.setState({
      todoItems: newTodoItems,
      dataSource: this.constructDataSource(newTodoItems)
    });
  };

  handleRemove = removedItemId => {
    const newTodoItems = this.state.todoItems.filter(item => {
      if (item.id === removedItemId) {
        return false;
      } else {
        return true;
      }
    });

    this.setState({
      todoItems: newTodoItems,
      dataSource: this.constructDataSource(newTodoItems)
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={'Enter todo item'}
          onChangeText={this.handleTextChange}
          value={this.state.text}
        />
        {this.state.text.length > 0 ? (
          <TouchableOpacity style={styles.addButton} onPress={this.handleAddPress}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        ) : null}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={todoItem => (
            <TodoItem
              id={todoItem.id}
              text={todoItem.text}
              completed={todoItem.completed}
              onDone={() => this.handleDone(todoItem.id)}
              onRemove={() => this.handleRemove(todoItem.id)}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  textInput: {
    fontSize: 20,
    padding: 10
  },
  addButton: {
    backgroundColor: 'green',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  addButtonText: {
    fontSize: 15,
    color: 'white'
  }
});
