export default function createTodoItem(text) {
  return {
    id: Math.random() * 1000000,
    text,
    completed: false
  };
}
