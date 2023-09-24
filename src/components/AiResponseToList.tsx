import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AiResponseToList.css";
import { Delete as DeleteIcon } from "@mui/icons-material";

// Define type for MultiLineList props
interface AiResponseToListProps {
  title: string;
  text: string;
  isLoading: boolean;
}

// Parent Component
const AiResponseToList: React.FC<AiResponseToListProps> = ({
  title,
  text,
  isLoading,
}) => {
  if (isLoading) {
    return <div>Generating...</div>;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");
  const initialListItems: string[] = [];

  doc.querySelectorAll("li").forEach((item) => {
    initialListItems.push(item.textContent || "");
  });

  const [listItems, setListItems] = useState(initialListItems);

  const handleDelete = (indexToDelete: number) => {
    const newListItems = listItems.filter(
      (item, index) => index !== indexToDelete
    );
    setListItems(newListItems);
  };

  return (
    <>
      <h3>{title}</h3>
      <ul className="list-group">
        {listItems.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex flex-column align-items-stretch"
          >
            <div className="d-flex align-items-center justify-content-between">
              <input
                className="form-check-input me-1"
                type="checkbox"
                value=""
              />
              <span className="me-auto">{item}</span>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn"
                  style={{ color: "red" }}
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AiResponseToList;
