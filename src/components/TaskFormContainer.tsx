import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TaskFormContainerStyles.css";
import TaskList from "./TaskList";

interface Props {
  title: string;
  label: string;
}

const TaskFormContainer: React.FC<Props> = ({ title, label }) => {
  const [text, setText] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log("button has been pressed");
    setSubmitted(true);
  };

  if (submitted) {
    return <TaskList text={text} />;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">{title}</h2>
      <div className="form-group">
        <label htmlFor="textArea">{label}</label>
        <textarea
          className="form-control"
          id="textArea"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="mt-3 d-grid gap-2 col-4 mx-auto">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Generate
        </button>
      </div>
    </div>
  );
};

export default TaskFormContainer;
