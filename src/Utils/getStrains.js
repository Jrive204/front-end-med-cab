import { axiosWithAuth } from "./axiosWithAuth";

export default function getStrains() {
  axiosWithAuth()
    .post("https://medcabinet1.herokuapp.com/api/strains", {
      limit: 50,
     
    })
    .then(res => {
      console.log('getStrains',res);
      return res.data;
    })
    .catch(err => console.log(err));
};
