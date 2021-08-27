import React from "react";
import "./QueueItem.css";

const QueueItem = (props) => {
  const { firstName, lastName, index } = props;
  return (
    <div className="card">
      <div className="name">
        <p>
          {index}. {firstName} {lastName}
        </p>
      </div>
      <a href="/#" className="close">
        X
      </a>
    </div>
  );
};

export default QueueItem;
