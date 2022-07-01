export const GET_CITIES = 'GET_CITIES';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';

const API_URL = 'https://mocki.io/v1/af7ca775-ea02-4f25-a971-dc83d71d1ac6';

export const getCities = () => {
  try {
    return async dispatch => {
      const result = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: GET_CITIES,
          payload: json,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const setEmail = email => dispatch => {
  dispatch({
    type: SET_EMAIL,
    payload: email,
  });
};
export const setPassword = password => dispatch => {
  dispatch({
    type: SET_PASSWORD,
    payload: password,
  });
};

