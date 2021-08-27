import * as api from "../api";
export const readQueues = async () => {
  try {
    const { data } = await api.readQueues();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createQueue = async (queue) => {
  try {
    const { data } = await api.createQueue(queue);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateQueue = async (id, queue) => {
  try {
    const { data } = await api.updateQueue(id, queue);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteQueue = async (id) => {
  try {
    await api.deleteQueue(id);
  } catch (error) {
    console.log(error);
  }
};
