import axios from 'axios';
import { toast } from 'react-toastify';

import storageService from '../../services/storage.service';
import { setAxiosHeaderAuthToken } from '../../util/helpers';
import { LOGIN_FAIL, LOGIN_SUCCESS } from './types';

export const loadUser = () => async (dispatch) => {
  if (storageService.getItem('authToken')) {
    setAxiosHeaderAuthToken(storageService.getItem('authToken'));
  }

  try {
    const response = (await axios.get('/api/user')).data;

    dispatch({
      type: 'USER_LOADED',
      payload: response.user,
    });
  } catch (error) {
    dispatch({
      type: 'AUTH_ERROR',
    });
  }
};

export const login = (loginPayload) => async (dispatch) => {
  try {
    const response = (await axios.post('/api/auth/login', loginPayload)).data;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    toast.error('Login failed. Try again');

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};