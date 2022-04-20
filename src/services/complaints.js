import axios from 'axios';
import { ApiUrl } from '../constants';

export const getComplaints = (payload) => {
 const url = ApiUrl + `/complaints/${payload.pageId}`;
 return axios.get(url, { headers: { 'authorization': `Bearer ${payload.token}` } })
}

export const addComplaint = ({token, data}) => {
 const url = ApiUrl + `/complaints`;
 return axios.post(url, data, { headers: { 'authorization': `Bearer ${token}` } })
}
