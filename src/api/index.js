import axios from "axios";
const url = "http://localhost:5000/queues";
export const readQueues = () => axios.get(url);
export const createQueue = (newQueue) => axios.post(url, newQueue);
export const updateQueue = (id, updatedQueueItem) =>
  axios.patch(`${url}/${id}`, updatedQueueItem);
export const deleteQueue = (id) => axios.delete(`${url}/${id}`);
