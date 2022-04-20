import axios from 'axios';
import { ApiUrl } from '../constants';

export const getFeedbacks = (payload) => {
 const url = ApiUrl + `/feedback/get/${payload.historyId}`;
 return axios.get(url, { headers: { 'authorization': `Bearer ${payload.token}` } })
}

export const updateFeedback = ({feedbackId, data, token}) => {
 const url = ApiUrl + `/feedback/update/${feedbackId}`;
 return axios.put(url, data, { headers: { 'authorization': `Bearer ${token}` } })
}

export const deleteFeedback = ({feedbackId, token}) => {
 const url = ApiUrl + `/feedback/delete/${feedbackId}`;
 return axios.delete(url, { headers: { 'authorization': `Bearer ${token}` } })
}

export const addFeedback = ({data, token}) => {
 const url = ApiUrl + `/feedback/create`;
 return axios.post(url, data, { headers: { 'authorization': `Bearer ${token}` } })
}