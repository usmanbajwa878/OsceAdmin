import axios from 'axios';
import { ApiUrl } from '../constants';

export const getConditions = (payload) => {
 const url = ApiUrl + `/conditions/${payload.historyId}`;
 return axios.get(url, { headers: { 'authorization': `Bearer ${payload.token}` } })
}

export const addCondition = ({ data, token }) => {
 const url = ApiUrl + `/conditions`;
 return axios.post(url, data, { headers: { 'authorization': `Bearer ${token}` } })
}

export const updateCondition = ({ conditionId, data, token }) => {
 const url = ApiUrl + `/conditions/${conditionId}`;
 return axios.put(url, data, { headers: { 'authorization': `Bearer ${token}` } })
}
export const deleteCondition = ({ conditionId, token }) => {
 const url = ApiUrl + `/conditions/${conditionId}`;
 return axios.delete(url, { headers: { 'authorization': `Bearer ${token}` } })
}