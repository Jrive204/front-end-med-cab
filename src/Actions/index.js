import { axiosWithAuth } from '../Utils/axiosWithAuth';
import { DATA_FAILURE, DATA_START, DATA_SUCCESS } from '../Reducers';

export const Fetch = () => dispatch => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .get('/items')
    .then(
      res =>
        console.log(res, 'res data') &
        dispatch({ type: DATA_SUCCESS, payload: res.data })
    )
    .catch(
      err =>
        console.log(err, 'ERROR') &
        dispatch({ type: DATA_FAILURE, payload: err })
    );
};
export const Fetchusers = () => dispatch => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .get('/users')
    .then(
      res =>
        console.log(res, 'res data') &
        dispatch({ type: DATA_SUCCESS, users: res.data })
    )
    .catch(
      err =>
        console.log(err, 'ERROR') &
        dispatch({ type: DATA_FAILURE, payload: err })
    );
};

export const Send = (url, data) => dispatch => {
  dispatch({ type: DATA_START });
  axiosWithAuth()
    .post(url, data)
    .then(res => {
      console.log(res, 'Sent data');
      dispatch({ type: DATA_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: DATA_FAILURE, payload: err.response });
    });
};

export const Edit = (id, data) => dispatch => {
  dispatch({ type: DATA_START });
  axiosWithAuth()
    .put(`/item/${id}`, data)
    .then(res => {
      console.log(res, 'Deleted data');
      dispatch({ type: DATA_SUCCESS });
      // dispatch(Fetch());
    })
    .catch(err => {
      dispatch({ type: DATA_FAILURE, payload: err.response });
    });
};

export const Delete = id => dispatch => {
  dispatch({ type: DATA_START });
  axiosWithAuth()
    .delete(`/item/${id}`)
    .then(res => {
      console.log(res, 'Deleted data');
      dispatch({ type: DATA_SUCCESS });
      // dispatch(Fetch());
    })
    .catch(err => {
      dispatch({ type: DATA_FAILURE, payload: err.response });
    });
};
