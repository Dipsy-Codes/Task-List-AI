import "./App.css";
import TaskFormContainer from "./components/TaskFormContainer";

function App() {
  return (
    <TaskFormContainer
      title="Task List Generator"
      label="Enter task description:"
    />
  );
}

export default App;
