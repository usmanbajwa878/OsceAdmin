import axios from 'axios';
import { ApiUrl } from '../constants';

export const getCards = (payload) => {
 const url = ApiUrl + `/moreInfo/${payload.feedbackId}`;
 return axios.get(url, { headers: { 'authorization': `Bearer ${payload.token}` } })
}
export const updateCard = ({ cardId, data, token }) => {
 const url = ApiUrl + `/moreInfo/${cardId}`;
 return axios.put(url, data, { headers: { 'authorization': `Bearer ${token}` } })
}
export const deleteCard = ({ cardId, token }) => {
 const url = ApiUrl + `/moreInfo/${cardId}`;
 return axios.delete(url, { headers: { 'authorization': `Bearer ${token}` } })
 .then((response) => {
  return response
 })
 .catch((error) => {
  return error.message;
 })
}
export const addCard = ({ data, token }) => {
 const url = ApiUrl + `/moreInfo`;
 return axios.post(url, data, { headers: { 'authorization': `Bearer ${token}` } })
}