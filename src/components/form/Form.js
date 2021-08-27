import React, { useEffect, useState } from "react";
import { updateQueue } from "../../api";
import { createQueue, deleteQueue, readQueues } from "../../functions";
import QueueItem from "../QueueItem/QueueItem";
import "./Form.css";
// JS
// const input = document.getElementById('myText');
// const inputValue = input.value
// React
// value, onChange

const Form = () => {
  const [queueItem, setQueueItem] = useState({ firstName: "", lastName: "" });
  const [queueItems, setQueueItems] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    let currentQueueItem =
      currentId !== null
        ? queueItems.find((queueItem) => queueItem._id === currentId)
        : { firstName: "", lastName: "" };
    setQueueItem(currentQueueItem);
  }, [currentId, queueItems]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await readQueues();
      setQueueItems(result);
    };
    fetchData();
  }, [currentId]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQueueItem({ ...queueItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === null && queueItem.firstName && queueItem.lastName) {
      const result = await createQueue(queueItem);
      console.log(result);
      setQueueItems([...queueItems, result]);
      setQueueItem({ firstName: "", lastName: "" });
    } else {
      await updateQueue(currentId, queueItem);
      setCurrentId(null);
    }
  };

  const deleteCurrentQueueItem = async (id) => {
    console.log(id);
    if (id !== null) {
      await deleteQueue(id);
      const queuesCopy = [...queueItems];
      const queuesAfterDelete = queuesCopy.filter(
        (queueItem) => queueItem._id !== id
      );
      setQueueItems(queuesAfterDelete);
    }
  };

  // const clear = () => {
  //   setCurrentId(null);
  //   setQueueItem({ firstName: "", lastName: "" });
  // };

  return (
    <div className="container-grid">
      <form className="container-center">
        <div className="form-control">
          <label htmlFor="firstName">Full Name : </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={queueItem.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last Name : </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={queueItem.lastName}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn" onClick={handleSubmit}>
          Enter Queue
        </button>
      </form>
      {queueItems && (
        <div className="queueItems">
          {queueItems.map((queueItem, index) => {
            const { _id, firstName, lastName } = queueItem;
            return (
              <div key={_id} className="queueItem">
                {/* <h1>{firstName}</h1>
                  <h1>{lastName}</h1> */}
                <QueueItem
                  firstName={firstName}
                  lastName={lastName}
                  index={index + 1}
                  id={_id}
                  deleteCurrentQueueItem={deleteCurrentQueueItem}
                />
                {/* <button onClick={() => setCurrentId(_id)}>Update</button>
                  <button onClick={() => deleteCurrentQueueItem(_id)}>
                    Delete
                  </button> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Form;
