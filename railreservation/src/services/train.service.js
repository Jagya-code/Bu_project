import httpClient from "../http-common";


const getAll = () => {
  return httpClient.get("/traindetails/g");
};

const get = (train_no) => {
  return httpClient.get(`/traindetails/ga/${train_no}`);
};

const create = (data) => {
  return httpClient.post("/traindetails/{i}", data);
};

const update = (data) => {
  return httpClient.put("/traindetails/u", data);
};

const remove = (train_no) => {
  return httpClient.delete(`/traindetails/d/${train_no}`);
};

const getByTrainName = (train_name) =>{
  return httpClient.get(`/traindetails/s/${train_name}`);
 }


export default { getAll, create, get, update, remove,getByTrainName };