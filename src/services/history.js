import axios from 'axios';
import { ApiUrl } from '../constants';

export const getHistories = (payload) => {
 const url = ApiUrl + `/history/get/${payload.pageId}/${payload.complaintId}`;
 return axios.get(url, { headers: { 'authorization': `Bearer ${payload.token}` } })
}

export const updateHistory = ({historyId, data, token}) => {
 const url = ApiUrl + `/history/update/${historyId}`;
 return axios.put(url, data, { headers: { 'authorization': `Bearer ${token}` } })
}
export const deleteHistory = ({historyId, token}) => {
 const url = ApiUrl + `/history/delete/${historyId}`;
 return axios.delete(url, { headers: { 'authorization': `Bearer ${token}` } })
}

export const addHistory = ({data, token}) => {
 const url = ApiUrl + `/history/create`;
 return axios.post(url, data, { headers: { 'authorization': `Bearer ${token}` } })
}