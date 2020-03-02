import { axiosWithAuth } from "./axiosWithAuth";

export default function getStrains() {
  axiosWithAuth()
    .post("https://medcabinet1.herokuapp.com/api/strains", {
      limit: 50,
      offset: 0
    })
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(err => console.log(err));
};
